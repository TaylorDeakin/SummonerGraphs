var express = require('express');
var router = express.Router();
var funcs = require('../scripts/functions.js');
var date = new Date();
var year = date.getFullYear();
var marked = require('marked');
var fs = require('fs');
var rp = require('request-promise');
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
                            player.calcAllTheThings();
                            req.session.player = player;
                            res.redirect(region + '/summoner/' + name + '/' + season);


                        })
                        .catch(function (err) {
                            if (err.statusCode == 429) {
                                retryAfter = err.response.headers.retry - after;
                                var errorString = '/limit?wait=' + retryAfter + '&summoner=' + name + '&region=' + region + '&season=' + season;
                                res.redirect(errorString);
                            } else {
                                //console.log(err);
                                req.flash('error', 'Summoner "' + name + '" has no mastery scores');
                                res.redirect('/');
                            }

                        });
                })
                .catch(function (err) {
                    if (err.statusCode == 429) {
                        //console.log(err.response.headers);
                        retryAfter = err.response.headers.retry - after;
                        var errorString = '/limit?wait=' + retryAfter + '&summoner=' + name + '&region=' + region + '&season=' + season;
                        res.redirect(errorString);
                        //console.log("Ranked Query ");
                    } else {
                        req.flash('error', 'Summoner "' + name + '" is not ranked');
                        res.redirect('/');
                    }
                });

        })
        .catch(function (err) {
            if (err.statusCode == 429) {
                //console.log(err.response.headers);
                retryAfter = err.response.headers.retry - after;
                var errorString = '/limit?wait=' + retryAfter + '&summoner=' + name + '&region=' + region + '&season=' + season;
                res.redirect(errorString);
                //console.log("Player Query");
            } else {
                req.flash('error', 'Couldn\'t find the summoner "' + name + '" in ' + funcs.getRegionName(region));
                res.redirect('/');
            }
        });


});

router.get('/:region/summoner/:name/:season', function (req, res, next) {
    var name = req.params.name;
    var region = req.params.region;
    var season = req.params.season;
    // if someone comes to a shared link, we have to
    if (!req.session.player) {
        res.redirect('/submit?summoner=' + name + "&region=" + region + "&season=" + season)
    } else {
        var player = req.session.player;
        var latestRegion = req.session.latestReigon;
        req.session.player = null;
        var apiKey = require('../private').apiKey;
        var versionQuery = "https://"
            + "global.api.pvp.net/api/lol/static-data/"
            + region
            + "/v1.2/versions?api_key="
            + apiKey;
        rp(versionQuery)
            .then(function(data){
                res.render('result', {
                    title: siteTitle,
                    pname: player.name,
                    picon: player.profileID,
                    plvl: player.lvl,
                    pRankedMasteryList: player._rankedMasteryList,
                    highestMastery: player._rankedMasteryList[0]['key'],
                    winrateChartData: player._winrateData,
                    kdaChartData: player._kdaData,
                    turretChartData: player._turretData,
                    minionsChartData: player._minionData,
                    damageDealtChartData: player._damageDealtData,
                    goldChartData: player._goldData,
                    version: JSON.parse(data)[0],
                    year: year,
                    latestRegion: latestRegion
                })
            })
            .catch(function(err){
                res.render('result', {
                    title: siteTitle,
                    pname: player.name,
                    picon: player.profileID,
                    plvl: player.lvl,
                    pRankedMasteryList: player._rankedMasteryList,
                    highestMastery: player._rankedMasteryList[0]['key'],
                    winrateChartData: player._winrateData,
                    kdaChartData: player._kdaData,
                    turretChartData: player._turretData,
                    minionsChartData: player._minionData,
                    damageDealtChartData: player._damageDealtData,
                    goldChartData: player._goldData,
                    version: "6.16.1",
                    year: year,
                    latestRegion: latestRegion
                })
            });

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
                res.status(500).render('error', {
                    status: "500",
                    message: "Server Error",
                    extended: "Oops! We've encountered an error. Please try again later."
                })
            } else {
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
