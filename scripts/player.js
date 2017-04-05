var method = Player.prototype;

var name, nameLower, region, season, playerData, _championList, profileID, lvl, playerID, _rankedMasteryList,
    _turretData, _kdaData, _firstBloodData, _winrateData, _damageDealtData, _goldData, _minionData, championLookup;

function Player(name, nameLower, region, season) {
    this.name = name;
    this.nameLower = nameLower;
    this.region = region;
    this.season = season;
    championLookup = {
        "1": {"id": "Annie", "name": "Annie"},
        "2": {"id": "Olaf", "name": "Olaf"},
        "3": {"id": "Galio", "name": "Galio"},
        "4": {"id": "TwistedFate", "name": "Twisted Fate"},
        "5": {"id": "XinZhao", "name": "Xin Zhao"},
        "6": {"id": "Urgot", "name": "Urgot"},
        "7": {"id": "Leblanc", "name": "LeBlanc"},
        "8": {"id": "Vladimir", "name": "Vladimir"},
        "9": {"id": "Fiddlesticks", "name": "Fiddlesticks"},
        "10": {"id": "Kayle", "name": "Kayle"},
        "11": {"id": "MasterYi", "name": "Master Yi"},
        "12": {"id": "Alistar", "name": "Alistar"},
        "13": {"id": "Ryze", "name": "Ryze"},
        "14": {"id": "Sion", "name": "Sion"},
        "15": {"id": "Sivir", "name": "Sivir"},
        "16": {"id": "Soraka", "name": "Soraka"},
        "17": {"id": "Teemo", "name": "Teemo"},
        "18": {"id": "Tristana", "name": "Tristana"},
        "19": {"id": "Warwick", "name": "Warwick"},
        "20": {"id": "Nunu", "name": "Nunu"},
        "21": {"id": "MissFortune", "name": "Miss Fortune"},
        "22": {"id": "Ashe", "name": "Ashe"},
        "23": {"id": "Tryndamere", "name": "Tryndamere"},
        "24": {"id": "Jax", "name": "Jax"},
        "25": {"id": "Morgana", "name": "Morgana"},
        "26": {"id": "Zilean", "name": "Zilean"},
        "27": {"id": "Singed", "name": "Singed"},
        "28": {"id": "Evelynn", "name": "Evelynn"},
        "29": {"id": "Twitch", "name": "Twitch"},
        "30": {"id": "Karthus", "name": "Karthus"},
        "31": {"id": "Chogath", "name": "Cho'Gath"},
        "32": {"id": "Amumu", "name": "Amumu"},
        "33": {"id": "Rammus", "name": "Rammus"},
        "34": {"id": "Anivia", "name": "Anivia"},
        "35": {"id": "Shaco", "name": "Shaco"},
        "36": {"id": "DrMundo", "name": "Dr. Mundo"},
        "37": {"id": "Sona", "name": "Sona"},
        "38": {"id": "Kassadin", "name": "Kassadin"},
        "39": {"id": "Irelia", "name": "Irelia"},
        "40": {"id": "Janna", "name": "Janna"},
        "41": {"id": "Gangplank", "name": "Gangplank"},
        "42": {"id": "Corki", "name": "Corki"},
        "43": {"id": "Karma", "name": "Karma"},
        "44": {"id": "Taric", "name": "Taric"},
        "45": {"id": "Veigar", "name": "Veigar"},
        "48": {"id": "Trundle", "name": "Trundle"},
        "50": {"id": "Swain", "name": "Swain"},
        "51": {"id": "Caitlyn", "name": "Caitlyn"},
        "53": {"id": "Blitzcrank", "name": "Blitzcrank"},
        "54": {"id": "Malphite", "name": "Malphite"},
        "55": {"id": "Katarina", "name": "Katarina"},
        "56": {"id": "Nocturne", "name": "Nocturne"},
        "57": {"id": "Maokai", "name": "Maokai"},
        "58": {"id": "Renekton", "name": "Renekton"},
        "59": {"id": "JarvanIV", "name": "Jarvan IV"},
        "60": {"id": "Elise", "name": "Elise"},
        "61": {"id": "Orianna", "name": "Orianna"},
        "62": {"id": "MonkeyKing", "name": "Wukong"},
        "63": {"id": "Brand", "name": "Brand"},
        "64": {"id": "LeeSin", "name": "Lee Sin"},
        "67": {"id": "Vayne", "name": "Vayne"},
        "68": {"id": "Rumble", "name": "Rumble"},
        "69": {"id": "Cassiopeia", "name": "Cassiopeia"},
        "72": {"id": "Skarner", "name": "Skarner"},
        "74": {"id": "Heimerdinger", "name": "Heimerdinger"},
        "75": {"id": "Nasus", "name": "Nasus"},
        "76": {"id": "Nidalee", "name": "Nidalee"},
        "77": {"id": "Udyr", "name": "Udyr"},
        "78": {"id": "Poppy", "name": "Poppy"},
        "79": {"id": "Gragas", "name": "Gragas"},
        "80": {"id": "Pantheon", "name": "Pantheon"},
        "81": {"id": "Ezreal", "name": "Ezreal"},
        "82": {"id": "Mordekaiser", "name": "Mordekaiser"},
        "83": {"id": "Yorick", "name": "Yorick"},
        "84": {"id": "Akali", "name": "Akali"},
        "85": {"id": "Kennen", "name": "Kennen"},
        "86": {"id": "Garen", "name": "Garen"},
        "89": {"id": "Leona", "name": "Leona"},
        "90": {"id": "Malzahar", "name": "Malzahar"},
        "91": {"id": "Talon", "name": "Talon"},
        "92": {"id": "Riven", "name": "Riven"},
        "96": {"id": "KogMaw", "name": "Kog'Maw"},
        "98": {"id": "Shen", "name": "Shen"},
        "99": {"id": "Lux", "name": "Lux"},
        "101": {"id": "Xerath", "name": "Xerath"},
        "102": {"id": "Shyvana", "name": "Shyvana"},
        "103": {"id": "Ahri", "name": "Ahri"},
        "104": {"id": "Graves", "name": "Graves"},
        "105": {"id": "Fizz", "name": "Fizz"},
        "106": {"id": "Volibear", "name": "Volibear"},
        "107": {"id": "Rengar", "name": "Rengar"},
        "110": {"id": "Varus", "name": "Varus"},
        "111": {"id": "Nautilus", "name": "Nautilus"},
        "112": {"id": "Viktor", "name": "Viktor"},
        "113": {"id": "Sejuani", "name": "Sejuani"},
        "114": {"id": "Fiora", "name": "Fiora"},
        "115": {"id": "Ziggs", "name": "Ziggs"},
        "117": {"id": "Lulu", "name": "Lulu"},
        "119": {"id": "Draven", "name": "Draven"},
        "120": {"id": "Hecarim", "name": "Hecarim"},
        "121": {"id": "Khazix", "name": "Kha'Zix"},
        "122": {"id": "Darius", "name": "Darius"},
        "126": {"id": "Jayce", "name": "Jayce"},
        "127": {"id": "Lissandra", "name": "Lissandra"},
        "131": {"id": "Diana", "name": "Diana"},
        "133": {"id": "Quinn", "name": "Quinn"},
        "134": {"id": "Syndra", "name": "Syndra"},
        "136": {"id": "AurelionSol", "name": "Aurelion Sol"},
        "143": {"id": "Zyra", "name": "Zyra"},
        "150": {"id": "Gnar", "name": "Gnar"},
        "154": {"id": "Zac", "name": "Zac"},
        "157": {"id": "Yasuo", "name": "Yasuo"},
        "161": {"id": "Velkoz", "name": "Vel'Koz"},
        "163": {"id": "Taliyah", "name": "Taliyah"},
        "201": {"id": "Braum", "name": "Braum"},
        "202": {"id": "Jhin", "name": "Jhin"},
        "203": {"id": "Kindred", "name": "Kindred"},
        "222": {"id": "Jinx", "name": "Jinx"},
        "223": {"id": "TahmKench", "name": "Tahm Kench"},
        "236": {"id": "Lucian", "name": "Lucian"},
        "238": {"id": "Zed", "name": "Zed"},
        "240": {"id": "Kled", "name": "Kled"},
        "245": {"id": "Ekko", "name": "Ekko"},
        "254": {"id": "Vi", "name": "Vi"},
        "266": {"id": "Aatrox", "name": "Aatrox"},
        "267": {"id": "Nami", "name": "Nami"},
        "268": {"id": "Azir", "name": "Azir"},
        "412": {"id": "Thresh", "name": "Thresh"},
        "420": {"id": "Illaoi", "name": "Illaoi"},
        "421": {"id": "RekSai", "name": "Rek'Sai"},
        "429": {"id": "Kalista", "name": "Kalista"},
        "432": {"id": "Bard", "name": "Bard"},
        "164": {"id": "Camille", "name": "Camille"},
        "427": {"id": "Ivern", "name": "Ivern"}
    };
}

method.getPlayerData = function () {
    return this.profileID;
};
method.getRankedData = function () {
    return _rankedMasteryList;
};
method.Lvl = function () {
    return this.lvl;
};
method.getName = function () {
    return this.name;
};

method.setData = function (stats) {
    this.championData = JSON.parse(stats);
    var championList = [];
    var champions = this.championData['champions'];
    var len = champions.length;
    for (i = 0; i < len; i++) {
        var champ = {};
        champ['id'] = champions[i]['id'];
        if (champ['id'] == 0) {
            continue;
        }
        champ['wins'] = champions[i]['stats']['totalSessionsWon'];
        champ['losses'] = champions[i]['stats']['totalSessionsLost'];
        champ['deaths'] = champions[i]['stats']['totalDeathsPerSession'];
        champ['kills'] = champions[i]['stats']['totalChampionKills'];
        champ['assists'] = champions[i]['stats']['totalAssists'];
        champ['damageDealt'] = champions[i]['stats']['totalDamageDealt'];
        champ['firstBlood'] = champions[i]['stats']['totalFirstBlood'];
        champ['minions'] = champions[i]['stats']['totalMinionKills'];
        champ['gold'] = champions[i]['stats']['totalGoldEarned'];
        champ['turrets'] = champions[i]['stats']['totalTurretsKilled'];
        champ['winrate'] = ((champ['wins'] / (champ['wins'] + champ['losses'])) * 100).toFixed(2);
        champ['kda'] = (champ['kills'] + champ['assists']) / champ['deaths'];
        championList.push(champ);
    }
    this._championList = championList;

};
method.setMasteryData = function (stats) {
    this.masteryData = JSON.parse(stats);
    var masteryList = [];
    var len = this.masteryData.length;

    for (i = 0; i < len; i++) {
        var champ = {};
        champ['id'] = this.masteryData[i]['championId'];
        champ['level'] = this.masteryData[i]['championLevel'];
        champ['points'] = this.masteryData[i]['championPoints'];
        masteryList.push(champ);
    }
    this._masteryList = masteryList;
};
method.setPlayerData = function (data) {
    this.playerData = JSON.parse(data);
    this.profileID = this.playerData[this.nameLower]['profileIconId'];
    this.lvl = this.playerData[this.nameLower]['summonerLevel'];

};
method.calcAllTheThings = function () {
    var rankedMastery = [];
    var turretData = minionData = firstBloodData = kdaData = winrateData = damageDealtData = goldData = "";
    var count = 0;
    for (i = 0; i < this._masteryList.length; i++) {
        for (j = 0; j < this._championList.length; j++) {
            if (this._championList[j].id == this._masteryList[i].id) {
                var champ = {};
                champ['id'] = this._championList[j]['id'];
                champ['turrets'] = this._championList[j]['turrets'];
                champ['minions'] = this._championList[j]['minions'];
                champ['wins'] = this._championList[j]['wins'];
                champ['losses'] = this._championList[j]['losses'];
                champ['gold'] = this._championList[j]['gold'];
                champ['firstBlood'] = this._championList[j]['firstBlood'];
                champ['kda'] = this._championList[j]['kda'];
                champ['winrate'] = this._championList[j]['winrate'];
                champ['damageDealt'] = this._championList[j]['damageDealt'];
                champ['level'] = this._masteryList[i]['level'];
                champ['points'] = this._masteryList[i]['points'];
                champ['name'] = getName(champ['id']);
                champ['key'] = getKey(champ['id']);
                rankedMastery.push(champ);
                if (count < 10) {
                    if (champ['turrets'] > 0) {
                        turretData += (
                        '[' + champ['points'] + ',' + champ['turrets'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if (champ['kda'] > 0) {
                        kdaData += (
                        '[' + champ['points'] + ',' + champ['kda'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if (champ['firstBlood'] > 0) {
                        firstBloodData += (
                        '[' + champ['points'] + ',' + champ['firstBlood'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if (champ['winrate'] > 0) {
                        winrateData += (
                        '[' + champ['points'] + ',' + champ['winrate'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if (champ['damageDealt'] > 0) {
                        damageDealtData += (
                        '[' + champ['points'] + ',' + champ['damageDealt'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if (champ['gold'] > 0) {
                        goldData += (
                        '[' + champ['points'] + ',' + champ['gold'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if (champ['minions'] > 0) {
                        minionData += (
                        '[' + champ['points'] + ',' + champ['minions'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                }
                count++;
                break;
            }
        }

    }

    this._turretData = turretData.slice(0, -1);
    this._kdaData = kdaData.slice(0, -1);
    this._firstBloodData = firstBloodData.slice(0, -1);
    this._winrateData = winrateData.slice(0, -1);
    this._damageDealtData = damageDealtData.slice(0, -1);
    this._goldData = goldData.slice(0, -1);
    this._minionData = minionData.slice(0, -1);
    this._rankedMasteryList = rankedMastery;

};
function getName(id) {
    try {
        if (championLookup.hasOwnProperty(id)) {
            return championLookup[id].name;
        }
        return ""
    }
    catch (err) {
        console.log(err);
    }
}

function getKey(id) {
    try {
        if (championLookup.hasOwnProperty(id)) {
            return championLookup[id].id;
        }
        return ""
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = Player;