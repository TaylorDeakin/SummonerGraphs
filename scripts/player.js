var method = Player.prototype;

/*
 this._turretData = turretData.slice(0, -1);
 this._kdaData = kdaData.slice(0, -1);
 this._firstBloodData = firstBloodData.slice(0, -1);
 this._winrateData = winrateData.slice(0, -1);
 this._damageDealtData = damageDealtData.slice(0, -1);
 this._goldData = goldData.slice(0, -1);
 this._minionData = minionData.slice(0, -1);
 */

var name, nameLower, region, season, playerData, _championList, profileID, lvl, playerID, _rankedMasteryList, _turretData, _kdaData, _firstBloodData, _winrateData, _damageDealtData, _goldData, _minionData;

function Player(name, nameLower, region, season) {
    this.name = name;
    this.nameLower = nameLower;
    this.region = region;
    this.season = season;

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
    var turretData =  minionData = firstBloodData =  kdaData =  winrateData = damageDealtData =  goldData = "";
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
                    if(champ['turrets'] > 0){
                        turretData += (
                        '[' + champ['points'] + ',' + champ['turrets'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if(champ['kda'] > 0){
                        kdaData += (
                        '[' + champ['points'] + ',' + champ['kda'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if(champ['firstBlood'] > 0){
                        firstBloodData += (
                        '[' + champ['points'] + ',' + champ['firstBlood'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if(champ['winrate'] > 0){
                        winrateData += (
                        '[' + champ['points'] + ',' + champ['winrate'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if(champ['damageDealt'] > 0){
                        damageDealtData += (
                        '[' + champ['points'] + ',' + champ['damageDealt'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if(champ['gold'] > 0){
                        goldData += (
                        '[' + champ['points'] + ',' + champ['gold'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                    }
                    if(champ['minions'] > 0){
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
    this._champNameList = [];
    this._champNameList[240] = "Kled";
    this._champNameList[143] = "Zyra";
    this._champNameList[266] = "Aatrox";
    this._champNameList[50] = "Swain";
    this._champNameList[23] = "Tryndamere";
    this._champNameList[18] = "Tristana";
    this._champNameList[79] = "Gragas";
    this._champNameList[6] = "Urgot";
    this._champNameList[69] = "Cassiopeia";
    this._champNameList[131] = "Diana";
    this._champNameList[136] = "Aurelion Sol";
    this._champNameList[54] = "Malphite";
    this._champNameList[13] = "Ryze";
    this._champNameList[33] = "Rammus";
    this._champNameList[78] = "Poppy";
    this._champNameList[29] = "Twitch";
    this._champNameList[14] = "Sion";
    this._champNameList[102] = "Shyvana";
    this._champNameList[202] = "Jhin";
    this._champNameList[154] = "Zac";
    this._champNameList[1] = "Annie";
    this._champNameList[236] = "Lucian";
    this._champNameList[111] = "Nautilus";
    this._champNameList[58] = "Renekton";
    this._champNameList[43] = "Karma";
    this._champNameList[245] = "Ekko";
    this._champNameList[99] = "Lux";
    this._champNameList[16] = "Soraka";
    this._champNameList[103] = "Ahri";
    this._champNameList[53] = "Blitzcrank";
    this._champNameList[2] = "Olaf";
    this._champNameList[41] = "Gangplank";
    this._champNameList[112] = "Viktor";
    this._champNameList[412] = "Thresh";
    this._champNameList[27] = "Singed";
    this._champNameList[36] = "Dr. Mundo";
    this._champNameList[86] = "Garen";
    this._champNameList[113] = "Sejuani";
    this._champNameList[34] = "Anivia";
    this._champNameList[133] = "Quinn";
    this._champNameList[57] = "Maokai";
    this._champNameList[120] = "Hecarim";
    this._champNameList[127] = "Lissandra";
    this._champNameList[19] = "Warwick";
    this._champNameList[25] = "Morgana";
    this._champNameList[101] = "Xerath";
    this._champNameList[105] = "Fizz";
    this._champNameList[119] = "Draven";
    this._champNameList[28] = "Evelynn";
    this._champNameList[91] = "Talon";
    this._champNameList[238] = "Zed";
    this._champNameList[114] = "Fiora";
    this._champNameList[74] = "Heimerdinger";
    this._champNameList[7] = "LeBlanc";
    this._champNameList[68] = "Rumble";
    this._champNameList[222] = "Jinx";
    this._champNameList[37] = "Sona";
    this._champNameList[21] = "Miss Fortune";
    this._champNameList[82] = "Mordekaiser";
    this._champNameList[201] = "Braum";
    this._champNameList[96] = "Kog'Maw";
    this._champNameList[44] = "Taric";
    this._champNameList[55] = "Katarina";
    this._champNameList[38] = "Kassadin";
    this._champNameList[117] = "Lulu";
    this._champNameList[59] = "Jarvan IV";
    this._champNameList[22] = "Ashe";
    this._champNameList[24] = "Jax";
    this._champNameList[30] = "Karthus";
    this._champNameList[429] = "Kalista";
    this._champNameList[12] = "Alistar";
    this._champNameList[223] = "Tahm Kench";
    this._champNameList[122] = "Darius";
    this._champNameList[63] = "Brand";
    this._champNameList[67] = "Vayne";
    this._champNameList[8] = "Vladimir";
    this._champNameList[110] = "Varus";
    this._champNameList[421] = "Rek'Sai";
    this._champNameList[77] = "Udyr";
    this._champNameList[84] = "Akali";
    this._champNameList[89] = "Leona";
    this._champNameList[163] = "Taliyah";
    this._champNameList[126] = "Jayce";
    this._champNameList[15] = "Sivir";
    this._champNameList[134] = "Syndra";
    this._champNameList[107] = "Rengar";
    this._champNameList[80] = "Pantheon";
    this._champNameList[72] = "Skarner";
    this._champNameList[92] = "Riven";
    this._champNameList[157] = "Yasuo";
    this._champNameList[121] = "Kha'Zix";
    this._champNameList[17] = "Teemo";
    this._champNameList[42] = "Corki";
    this._champNameList[75] = "Nasus";
    this._champNameList[51] = "Caitlyn";
    this._champNameList[35] = "Shaco";
    this._champNameList[268] = "Azir";
    this._champNameList[115] = "Ziggs";
    this._champNameList[76] = "Nidalee";
    this._champNameList[40] = "Janna";
    this._champNameList[85] = "Kennen";
    this._champNameList[61] = "Orianna";
    this._champNameList[3] = "Galio";
    this._champNameList[9] = "Fiddlesticks";
    this._champNameList[45] = "Veigar";
    this._champNameList[31] = "Cho'Gath";
    this._champNameList[432] = "Bard";
    this._champNameList[26] = "Zilean";
    this._champNameList[150] = "Gnar";
    this._champNameList[56] = "Nocturne";
    this._champNameList[90] = "Malzahar";
    this._champNameList[83] = "Yorick";
    this._champNameList[104] = "Graves";
    this._champNameList[203] = "Kindred";
    this._champNameList[254] = "Vi";
    this._champNameList[62] = "Wukong";
    this._champNameList[10] = "Kayle";
    this._champNameList[98] = "Shen";
    this._champNameList[39] = "Irelia";
    this._champNameList[5] = "Xin Zhao";
    this._champNameList[64] = "Lee Sin";
    this._champNameList[11] = "Master Yi";
    this._champNameList[420] = "Illaoi";
    this._champNameList[32] = "Amumu";
    this._champNameList[60] = "Elise";
    this._champNameList[48] = "Trundle";
    this._champNameList[106] = "Volibear";
    this._champNameList[161] = "Vel'Koz";
    this._champNameList[20] = "Nunu";
    this._champNameList[267] = "Nami";
    this._champNameList[4] = "Twisted Fate";
    this._champNameList[81] = "Ezreal";

    return this._champNameList[id];

};

function getKey(id) {

    this._champNameList = [];
    this._champNameList[240] = "Kled";
    this._champNameList[143] = "Zyra";
    this._champNameList[266] = "Aatrox";
    this._champNameList[50] = "Swain";
    this._champNameList[23] = "Tryndamere";
    this._champNameList[18] = "Tristana";
    this._champNameList[79] = "Gragas";
    this._champNameList[6] = "Urgot";
    this._champNameList[69] = "Cassiopeia";
    this._champNameList[131] = "Diana";
    this._champNameList[136] = "AurelionSol";
    this._champNameList[54] = "Malphite";
    this._champNameList[13] = "Ryze";
    this._champNameList[33] = "Rammus";
    this._champNameList[78] = "Poppy";
    this._champNameList[29] = "Twitch";
    this._champNameList[14] = "Sion";
    this._champNameList[102] = "Shyvana";
    this._champNameList[202] = "Jhin";
    this._champNameList[154] = "Zac";
    this._champNameList[1] = "Annie";
    this._champNameList[236] = "Lucian";
    this._champNameList[111] = "Nautilus";
    this._champNameList[58] = "Renekton";
    this._champNameList[43] = "Karma";
    this._champNameList[245] = "Ekko";
    this._champNameList[99] = "Lux";
    this._champNameList[16] = "Soraka";
    this._champNameList[103] = "Ahri";
    this._champNameList[53] = "Blitzcrank";
    this._champNameList[2] = "Olaf";
    this._champNameList[41] = "Gangplank";
    this._champNameList[112] = "Viktor";
    this._champNameList[412] = "Thresh";
    this._champNameList[27] = "Singed";
    this._champNameList[36] = "DrMundo";
    this._champNameList[86] = "Garen";
    this._champNameList[113] = "Sejuani";
    this._champNameList[34] = "Anivia";
    this._champNameList[133] = "Quinn";
    this._champNameList[57] = "Maokai";
    this._champNameList[120] = "Hecarim";
    this._champNameList[127] = "Lissandra";
    this._champNameList[19] = "Warwick";
    this._champNameList[25] = "Morgana";
    this._champNameList[101] = "Xerath";
    this._champNameList[105] = "Fizz";
    this._champNameList[119] = "Draven";
    this._champNameList[28] = "Evelynn";
    this._champNameList[91] = "Talon";
    this._champNameList[238] = "Zed";
    this._champNameList[114] = "Fiora";
    this._champNameList[74] = "Heimerdinger";
    this._champNameList[7] = "Leblanc";
    this._champNameList[68] = "Rumble";
    this._champNameList[222] = "Jinx";
    this._champNameList[37] = "Sona";
    this._champNameList[21] = "MissFortune";
    this._champNameList[82] = "Mordekaiser";
    this._champNameList[201] = "Braum";
    this._champNameList[96] = "KogMaw";
    this._champNameList[44] = "Taric";
    this._champNameList[55] = "Katarina";
    this._champNameList[38] = "Kassadin";
    this._champNameList[117] = "Lulu";
    this._champNameList[59] = "JarvanIV";
    this._champNameList[22] = "Ashe";
    this._champNameList[24] = "Jax";
    this._champNameList[30] = "Karthus";
    this._champNameList[429] = "Kalista";
    this._champNameList[12] = "Alistar";
    this._champNameList[223] = "TahmKench";
    this._champNameList[122] = "Darius";
    this._champNameList[63] = "Brand";
    this._champNameList[67] = "Vayne";
    this._champNameList[8] = "Vladimir";
    this._champNameList[110] = "Varus";
    this._champNameList[421] = "RekSai";
    this._champNameList[77] = "Udyr";
    this._champNameList[84] = "Akali";
    this._champNameList[89] = "Leona";
    this._champNameList[163] = "Taliyah";
    this._champNameList[126] = "Jayce";
    this._champNameList[15] = "Sivir";
    this._champNameList[134] = "Syndra";
    this._champNameList[107] = "Rengar";
    this._champNameList[80] = "Pantheon";
    this._champNameList[72] = "Skarner";
    this._champNameList[92] = "Riven";
    this._champNameList[157] = "Yasuo";
    this._champNameList[121] = "Khazix";
    this._champNameList[17] = "Teemo";
    this._champNameList[42] = "Corki";
    this._champNameList[75] = "Nasus";
    this._champNameList[51] = "Caitlyn";
    this._champNameList[35] = "Shaco";
    this._champNameList[268] = "Azir";
    this._champNameList[115] = "Ziggs";
    this._champNameList[76] = "Nidalee";
    this._champNameList[40] = "Janna";
    this._champNameList[85] = "Kennen";
    this._champNameList[61] = "Orianna";
    this._champNameList[3] = "Galio";
    this._champNameList[9] = "Fiddlesticks";
    this._champNameList[45] = "Veigar";
    this._champNameList[31] = "Chogath";
    this._champNameList[432] = "Bard";
    this._champNameList[26] = "Zilean";
    this._champNameList[150] = "Gnar";
    this._champNameList[56] = "Nocturne";
    this._champNameList[90] = "Malzahar";
    this._champNameList[83] = "Yorick";
    this._champNameList[104] = "Graves";
    this._champNameList[203] = "Kindred";
    this._champNameList[254] = "Vi";
    this._champNameList[62] = "MonkeyKing";
    this._champNameList[10] = "Kayle";
    this._champNameList[98] = "Shen";
    this._champNameList[39] = "Irelia";
    this._champNameList[5] = "XinZhao";
    this._champNameList[64] = "LeeSin";
    this._champNameList[11] = "MasterYi";
    this._champNameList[420] = "Illaoi";
    this._champNameList[32] = "Amumu";
    this._champNameList[60] = "Elise";
    this._champNameList[48] = "Trundle";
    this._champNameList[106] = "Volibear";
    this._champNameList[161] = "Velkoz";
    this._champNameList[20] = "Nunu";
    this._champNameList[267] = "Nami";
    this._champNameList[4] = "TwistedFate";
    this._champNameList[81] = "Ezreal";

    return this._champNameList[id];
}

module.exports = Player;