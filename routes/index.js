var express = require('express');
var router = express.Router();
var funcs = require('../scripts/functions.js');
var date = new Date();
var year = date.getFullYear();
var marked = require('marked');
var fs = require('fs');

var siteTitle = "Summoner Graphs";

/* GET home page. */
router.get('/', function (req, res, next) {
    var latestRegion = req.session.latestRegion;

    res.render('index', {
        title: siteTitle,
        splash: funcs.getSplash(),
        error: req.flash('error'),
        latestRegion: latestRegion
    });
});
router.get('/submit', function (req, res, next) {
    var validator = require('validator');
    var request = require('request');
    var fs = require('fs');
    var rp = require('request-promise');
    var Player = require('../scripts/player.js');
    var apiKey = require('../private').apiKey;
    var name, nameLower, region, season, retryAfter;


    name = req.query.summoner;
    region = req.query.region;
    season = req.query.season;

    if (!req.session.latestRegion != region) {
        req.session.latestReigon = region;
    }

    nameLower = funcs.FormatName(name);
    // Player Object helps keep me sane, although there's probably a better way to do it
    var player = new Player(name, nameLower, region, season);

    // Construct URL string
    urlString = "https://"
        + region
        + ".api.pvp.net/api/lol/"
        + region
        + "/v1.4/summoner/by-name/"
        + name
        + "?api_key="
        + apiKey;

    rp(urlString)
        .then(function (jsonString) {

            var data = JSON.parse(jsonString);
            player.setPlayerData(jsonString);
            var playerId = data[nameLower]['id'];
            var rankedQuery = "https://"
                + region
                + ".api.pvp.net/api/lol/"
                + region
                + "/v1.3/stats/by-summoner/"
                + playerId
                + "/ranked?season=SEASON"
                + season
                + "&api_key="
                + apiKey;

            var regionCode = funcs.getRegionCode(region);

            var masteryQuery = "https://"
                + region
                + ".api.pvp.net/championmastery/location/"
                + regionCode
                + "/player/"
                + playerId
                + "/champions?api_key="
                + apiKey;


            rp(rankedQuery)
                .then(function (jsonString) {
                    player.setData(jsonString);
                    rp(masteryQuery)
                        .then(function (jsonString) {
                            player.setMasteryData(jsonString);
                            //aparently I forgot that I needed this
                            player.calcWinrate();
                            player.calcKDA();
                            player.calcTowerKills();
                            req.session.player = player;
                            res.redirect(region + '/summoner/' + name + '/' + season);


                        })
                        .catch(function (err) {
                            if (err.statusCode == 429) {
                                console.log(err.response.headers);
                                console.log("Mastery Score Query");
                                retryAfter = err.response.headers.retry - after;
                                var errorString = '/limit?wait=' + retryAfter + '&summoner=' + name + '&region=' + region + '&season=' + season;
                                res.redirect(errorString);
                            } else {
                                console.log(err);
                                req.flash('error', 'Summoner "' + name + '" has no mastery scores');
                                res.redirect('/');
                            }

                        });
                })
                .catch(function (err) {
                    if (err.statusCode == 429) {
                        console.log(err.response.headers);
                        retryAfter = err.response.headers.retry - after;
                        var errorString = '/limit?wait=' + retryAfter + '&summoner=' + name + '&region=' + region + '&season=' + season;
                        res.redirect(errorString);
                        console.log("Ranked Query ");
                    } else {
                        req.flash('error', 'Summoner "' + name + '" is not ranked');
                        res.redirect('/');
                    }
                });

        })
        .catch(function (err) {
            if (err.statusCode == 429) {
                console.log(err.response.headers);
                retryAfter = err.response.headers.retry - after;
                var errorString = '/limit?wait=' + retryAfter + '&summoner=' + name + '&region=' + region + '&season=' + season;
                res.redirect(errorString);
                console.log("Player Query");
            } else {
                req.flash('error', 'Couldn\'t find the summoner "' + name + '" in ' + funcs.getRegionName(region));
                res.redirect('/');
            }
        });


});

router.get('/:region/summoner/:name/:season', function (req, res, next) {
    // if someone comes to a shared link, we have to
    if (!req.session.player) {
        var name = req.params.name;
        var region = req.params.region;
        var season = req.params.season;
        res.redirect('/submit?summoner=' + name + "&region=" + region + "&season=" + season)
    } else {
        var player = req.session.player;
        var latestRegion = req.session.latestReigon;
        req.session.player = null;

        res.render('result', {
            title: siteTitle,
            pname: player.name,
            picon: player.profileID,
            plvl: player.lvl,
            pRankedMasteryList: player._rankedMasteryList,
            highestMastery: player._rankedMasteryList[0]['key'],
            winrateChartData: player._winrateChartData,
            kdaChartData: player._kdaChartData,
            turretChartData: player._turretChartData,
            version: "6.14.2",
            year: year,
            latestRegion: latestRegion
        })
    }


});
router.get('/limit', function (req, res, next) {
    var wait = req.query.wait;
    var name = req.query.summoner;
    var region = req.query.region;
    var season = req.query.season;
    if (wait > 3) {
        req.flash('error', "We're currently experiencing heavy traffic. Please try again in a few minutes");
        res.redirect('/');
    } else {
        setTimeout(function () {
            console.log("time's up");
            res.redirect('/submit?summoner=' + name + "&region=" + region + "&season=" + season);
        }, wait * 1000);
    }


});

router.get('/:name', function (req, res, next) {
    var name = req.params.name;
    // setup to allow more pages in the future
    var pages = ["about"];
    var pageNames = ["About"];
    var latestRegion = req.session.latestRegion;

    if (pages.indexOf(name) > -1) {
        fs.readFile('./page-' + name + ".md", 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            } else {

                console.log(data);
                console.log(marked(data));
                res.render('page', {
                    title: siteTitle,
                    pagetitle: pageNames[pages.indexOf(name)],
                    cssidentifier: 'page',
                    content: marked(data),
                    year: year,
                    latestRegion: latestRegion
                });
            }
        })

    } else {
        res.status(404).render('error', {
            status: "404",
            message: "Page Not Found",
            extended: "Oops! The page you were looking for can't be found.",
            cssidentifier: "error-404"
        });
    }
});


module.exports = router;
