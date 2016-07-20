var method = Player.prototype;

var name, nameLower, region, season, playerData, winrateData, _winrateList, masteryData, _masteryList, profileID, lvl, playerID, _rankedMasteryList, _chartData;

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

method.setWinrateData = function (stats) {
    this.winrateData = JSON.parse(stats);
    var winrateList = [];
    var winrates = this.winrateData['champions'];
    var len = winrates.length;
    for (i = 0; i < len; i++) {
        var champ = {};
        champ['id'] = winrates[i]['id'];
        if (champ['id'] == 0) {
            continue;
        }
        champ['wins'] = winrates[i]['stats']['totalSessionsWon'];
        champ['losses'] = winrates[i]['stats']['totalSessionsLost'];
        champ['winrate'] = champ['wins'] / (champ['wins'] + champ['losses']);
        champ['winrate'] *= 100;
        champ['winrate'] = champ['winrate'].toFixed(2);
        winrateList.push(champ);
    }
    this._winrateList = winrateList;


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
method.calc = function () {
    var rankedMastery = [];
    var chartData = "";
    var count = 0;
    for (i = 0; i < this._masteryList.length; i++) {
        for (j = 0; j < this._winrateList.length; j++) {
            if (this._winrateList[j].id == this._masteryList[i].id) {
                var champ = {};
                champ['id'] = this._winrateList[j]['id'];
                champ['wins'] = this._winrateList[j]['wins'];
                champ['losses'] = this._winrateList[j]['losses'];
                champ['winrate'] = this._winrateList[j]['winrate'];
                champ['level'] = this._masteryList[i]['level'];
                champ['points'] = this._masteryList[i]['points'];
                champ['name'] = getName(champ['id']);
                champ['key'] = getKey(champ['id']);
                rankedMastery.push(champ);

                if (count < 10) {
                    chartData += (
                    '[' + champ['points'] + ',' + champ['winrate'] + ', ' + 5 + ', {label: "' + champ['key'] + '.png,' + champ['level'] + '"}],');
                }
                count++;

                break;
            }
        }

    }

    chartData = chartData.slice(0, -1);
    console.log(chartData);
    this._chartData = chartData;

    this._rankedMasteryList = rankedMastery;

    return this._rankedMasteryList;

};


function getName(id) {
    champList = [];
    champList[143] = "Zyra";
    champList[266] = "Aatrox";
    champList[50] = "Swain";
    champList[23] = "Tryndamere";
    champList[18] = "Tristana";
    champList[79] = "Gragas";
    champList[6] = "Urgot";
    champList[69] = "Cassiopeia";
    champList[131] = "Diana";
    champList[136] = "Aurelion Sol";
    champList[54] = "Malphite";
    champList[13] = "Ryze";
    champList[33] = "Rammus";
    champList[78] = "Poppy";
    champList[29] = "Twitch";
    champList[14] = "Sion";
    champList[102] = "Shyvana";
    champList[202] = "Jhin";
    champList[154] = "Zac";
    champList[1] = "Annie";
    champList[236] = "Lucian";
    champList[111] = "Nautilus";
    champList[58] = "Renekton";
    champList[43] = "Karma";
    champList[245] = "Ekko";
    champList[99] = "Lux";
    champList[16] = "Soraka";
    champList[103] = "Ahri";
    champList[53] = "Blitzcrank";
    champList[2] = "Olaf";
    champList[41] = "Gangplank";
    champList[112] = "Viktor";
    champList[412] = "Thresh";
    champList[27] = "Singed";
    champList[36] = "Dr. Mundo";
    champList[86] = "Garen";
    champList[113] = "Sejuani";
    champList[34] = "Anivia";
    champList[133] = "Quinn";
    champList[57] = "Maokai";
    champList[120] = "Hecarim";
    champList[127] = "Lissandra";
    champList[19] = "Warwick";
    champList[25] = "Morgana";
    champList[101] = "Xerath";
    champList[105] = "Fizz";
    champList[119] = "Draven";
    champList[28] = "Evelynn";
    champList[91] = "Talon";
    champList[238] = "Zed";
    champList[114] = "Fiora";
    champList[74] = "Heimerdinger";
    champList[7] = "LeBlanc";
    champList[68] = "Rumble";
    champList[222] = "Jinx";
    champList[37] = "Sona";
    champList[21] = "Miss Fortune";
    champList[82] = "Mordekaiser";
    champList[201] = "Braum";
    champList[96] = "Kog'Maw";
    champList[44] = "Taric";
    champList[55] = "Katarina";
    champList[38] = "Kassadin";
    champList[117] = "Lulu";
    champList[59] = "Jarvan IV";
    champList[22] = "Ashe";
    champList[24] = "Jax";
    champList[30] = "Karthus";
    champList[429] = "Kalista";
    champList[12] = "Alistar";
    champList[223] = "Tahm Kench";
    champList[122] = "Darius";
    champList[63] = "Brand";
    champList[67] = "Vayne";
    champList[8] = "Vladimir";
    champList[110] = "Varus";
    champList[421] = "Rek'Sai";
    champList[77] = "Udyr";
    champList[84] = "Akali";
    champList[89] = "Leona";
    champList[163] = "Taliyah";
    champList[126] = "Jayce";
    champList[15] = "Sivir";
    champList[134] = "Syndra";
    champList[107] = "Rengar";
    champList[80] = "Pantheon";
    champList[72] = "Skarner";
    champList[92] = "Riven";
    champList[157] = "Yasuo";
    champList[121] = "Kha'Zix";
    champList[17] = "Teemo";
    champList[42] = "Corki";
    champList[75] = "Nasus";
    champList[51] = "Caitlyn";
    champList[35] = "Shaco";
    champList[268] = "Azir";
    champList[115] = "Ziggs";
    champList[76] = "Nidalee";
    champList[40] = "Janna";
    champList[85] = "Kennen";
    champList[61] = "Orianna";
    champList[3] = "Galio";
    champList[9] = "Fiddlesticks";
    champList[45] = "Veigar";
    champList[31] = "Cho'Gath";
    champList[432] = "Bard";
    champList[26] = "Zilean";
    champList[150] = "Gnar";
    champList[56] = "Nocturne";
    champList[90] = "Malzahar";
    champList[83] = "Yorick";
    champList[104] = "Graves";
    champList[203] = "Kindred";
    champList[254] = "Vi";
    champList[62] = "Wukong";
    champList[10] = "Kayle";
    champList[98] = "Shen";
    champList[39] = "Irelia";
    champList[5] = "Xin Zhao";
    champList[64] = "Lee Sin";
    champList[11] = "Master Yi";
    champList[420] = "Illaoi";
    champList[32] = "Amumu";
    champList[60] = "Elise";
    champList[48] = "Trundle";
    champList[106] = "Volibear";
    champList[161] = "Vel'Koz";
    champList[20] = "Nunu";
    champList[267] = "Nami";
    champList[4] = "Twisted Fate";
    champList[81] = "Ezreal";

    return champList[id];
};

function getKey(id) {
    champList = [];
    champList[143] = "Zyra";
    champList[266] = "Aatrox";
    champList[50] = "Swain";
    champList[23] = "Tryndamere";
    champList[18] = "Tristana";
    champList[79] = "Gragas";
    champList[6] = "Urgot";
    champList[69] = "Cassiopeia";
    champList[131] = "Diana";
    champList[136] = "AurelionSol";
    champList[54] = "Malphite";
    champList[13] = "Ryze";
    champList[33] = "Rammus";
    champList[78] = "Poppy";
    champList[29] = "Twitch";
    champList[14] = "Sion";
    champList[102] = "Shyvana";
    champList[202] = "Jhin";
    champList[154] = "Zac";
    champList[1] = "Annie";
    champList[236] = "Lucian";
    champList[111] = "Nautilus";
    champList[58] = "Renekton";
    champList[43] = "Karma";
    champList[245] = "Ekko";
    champList[99] = "Lux";
    champList[16] = "Soraka";
    champList[103] = "Ahri";
    champList[53] = "Blitzcrank";
    champList[2] = "Olaf";
    champList[41] = "Gangplank";
    champList[112] = "Viktor";
    champList[412] = "Thresh";
    champList[27] = "Singed";
    champList[36] = "DrMundo";
    champList[86] = "Garen";
    champList[113] = "Sejuani";
    champList[34] = "Anivia";
    champList[133] = "Quinn";
    champList[57] = "Maokai";
    champList[120] = "Hecarim";
    champList[127] = "Lissandra";
    champList[19] = "Warwick";
    champList[25] = "Morgana";
    champList[101] = "Xerath";
    champList[105] = "Fizz";
    champList[119] = "Draven";
    champList[28] = "Evelynn";
    champList[91] = "Talon";
    champList[238] = "Zed";
    champList[114] = "Fiora";
    champList[74] = "Heimerdinger";
    champList[7] = "Leblanc";
    champList[68] = "Rumble";
    champList[222] = "Jinx";
    champList[37] = "Sona";
    champList[21] = "MissFortune";
    champList[82] = "Mordekaiser";
    champList[201] = "Braum";
    champList[96] = "KogMaw";
    champList[44] = "Taric";
    champList[55] = "Katarina";
    champList[38] = "Kassadin";
    champList[117] = "Lulu";
    champList[59] = "JarvanIV";
    champList[22] = "Ashe";
    champList[24] = "Jax";
    champList[30] = "Karthus";
    champList[429] = "Kalista";
    champList[12] = "Alistar";
    champList[223] = "TahmKench";
    champList[122] = "Darius";
    champList[63] = "Brand";
    champList[67] = "Vayne";
    champList[8] = "Vladimir";
    champList[110] = "Varus";
    champList[421] = "RekSai";
    champList[77] = "Udyr";
    champList[84] = "Akali";
    champList[89] = "Leona";
    champList[163] = "Taliyah";
    champList[126] = "Jayce";
    champList[15] = "Sivir";
    champList[134] = "Syndra";
    champList[107] = "Rengar";
    champList[80] = "Pantheon";
    champList[72] = "Skarner";
    champList[92] = "Riven";
    champList[157] = "Yasuo";
    champList[121] = "Khazix";
    champList[17] = "Teemo";
    champList[42] = "Corki";
    champList[75] = "Nasus";
    champList[51] = "Caitlyn";
    champList[35] = "Shaco";
    champList[268] = "Azir";
    champList[115] = "Ziggs";
    champList[76] = "Nidalee";
    champList[40] = "Janna";
    champList[85] = "Kennen";
    champList[61] = "Orianna";
    champList[3] = "Galio";
    champList[9] = "Fiddlesticks";
    champList[45] = "Veigar";
    champList[31] = "Chogath";
    champList[432] = "Bard";
    champList[26] = "Zilean";
    champList[150] = "Gnar";
    champList[56] = "Nocturne";
    champList[90] = "Malzahar";
    champList[83] = "Yorick";
    champList[104] = "Graves";
    champList[203] = "Kindred";
    champList[254] = "Vi";
    champList[62] = "MonkeyKing";
    champList[10] = "Kayle";
    champList[98] = "Shen";
    champList[39] = "Irelia";
    champList[5] = "XinZhao";
    champList[64] = "LeeSin";
    champList[11] = "MasterYi";
    champList[420] = "Illaoi";
    champList[32] = "Amumu";
    champList[60] = "Elise";
    champList[48] = "Trundle";
    champList[106] = "Volibear";
    champList[161] = "Velkoz";
    champList[20] = "Nunu";
    champList[267] = "Nami";
    champList[4] = "TwistedFate";
    champList[81] = "Ezreal";

    return champList[id];
}

module.exports = Player;