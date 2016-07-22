var splashes = ["Aatrox_0", "Ahri_0", "Akali_0", "Alistar_0", "Amumu_0", "Amumu_1", "Anivia_0", "Annie_0", "Ashe_0", "Ashe_2", "Ashe_3", "Ashe_4", "Azir_0", "Azir_1", "Bard_0", "Bard_1", "Blitzcrank_0", "Blitzcrank_3", "Brand_0", "Brand_1", "Brand_2", "Braum_0", "Caitlyn_0", "Caitlyn_1", "Cassiopeia_0", "Cassiopeia_1", "Cassiopeia_2", "Chogath_0", "Chogath_2", "Corki_0", "Darius_0", "Darius_2", "Diana_0", "Diana_1", "Draven_0", "Draven_2", "Draven_3", "DrMundo_0", "Ekko_0", "Ekko_1", "Ekko_2", "Elise_0", "Evelynn_0", "Ezreal_0", "Ezreal_1", "Ezreal_3", "FiddleSticks_0", "Fiora_0", "Fizz_0", "Fizz_1", "Fizz_2", "Galio_0", "Gangplank_0", "Garen_0", "Garen_2", "Garen_3", "Gnar_0", "Gnar_1", "Gnar_2", "Gragas_0", "Graves_0", "Hecarim_0", "Heimerdinger_0", "Heimerdinger_1", "Illaoi_0", "Irelia_0", "Irelia_1", "Janna_0", "Janna_1", "JarvanIV_0", "JarvanIV_1", "Jax_0", "Jax_2", "Jayce_0", "Jinx_0", "Jinx_2", "Kalista_0", "Karma_0", "Karthus_0", "Kassadin_0", "Katarina_0", "Katarina_1", "Kayle_0", "Kayle_1", "Kayle_2", "Kennen_0", "Kennen_1", "Kennen_2", "Khazix_0", "Kindred_0", "KogMaw_0", "Leblanc_0", "LeeSin_0", "Leona_0", "Lissandra_0", "Lucian_0", "Lulu_0", "Malzahar_0", "Maokai_0", "MasterYi_0", "MissFortune_0", "MonkeyKing_0", "Mordekaiser_0", "Morgana_0", "Nami_0", "Nasus_0", "Nautilus_0", "Nidalee_0", "Nocturne_0", "Nocturne_1", "Nunu_0", "Olaf_0", "Olaf_2", "Orianna_0", "Pantheon_0", "Pantheon_1", "Pantheon_2", "Poppy_0", "Poppy_1", "Quinn_0", "Rammus_0", "RekSai_0", "Renekton_0", "Rengar_0", "Riven_0", "Rumble_0", "Ryze_0", "Sejuani_0", "Shaco_0", "Shen_0", "Shyvana_0", "Singed_0", "Sion_0", "Sivir_0", "Skarner_0", "Sona_0", "Sona_2", "Sona_6", "Soraka_0", "Soraka_3", "Swain_0", "Syndra_0", "Talon_0", "Taric_0", "Teemo_0", "Thresh_0", "Tristana_0", "Trundle_0", "Tryndamere_0", "TwistedFate_0", "TwistedFate_1", "Twitch_0", "Udyr_0", "Urgot_0", "Varus_0", "Vayne_0", "Vayne_1", "Vayne_2", "Veigar_0", "Velkoz_0", "Velkoz_1", "Velkoz_2", "Vi_0", "Viktor_0", "Viktor_2", "Vladimir_0", "Vladimir_1", "Vladimir_2", "Volibear_0", "Warwick_0", "Warwick_1", "Xerath_0", "XinZhao_0", "XinZhao_1", "XinZhao_2", "Yasuo_0", "Yasuo_1", "Yorick_0", "Zac_0", "Zed_0", "Zed_1", "Ziggs_0", "Zilean_0", "Zyra_0"];
module.exports = {

    /**
     * @return {string}
     * thanks WebStorm...
     */
    FormatName: function(name) {
    var nameToFormat = name.toLowerCase();
    nameToFormat = nameToFormat.replace(" ", "");

    return nameToFormat;

},
getRegionCode: function(region) {
    switch (region) {
        case "br":
            return "BR1";
            break;
        case "eune":
            return "EUN1";
            break;
        case "euw":
            return "EUW1";
            break;
        case "lan":
            return "LA1";
            break;
        case "las":
            return "LA2";
            break;
        case "na":
            return "NA1";
            break;
        case "oce":
            return "OC1";
            break;
        case "ru":
            return "RU";
            break;
        case "tr":
            return "TR1";
            break;
    }
},
getRegionName: function(region){
    switch (region){
        case "br":
            return "Brazil";
            break;
        case "eune":
            return "Europe Nordic & East";
            break;
        case "euw":
            return "Europe West";
            break;
        case "lan":
            return "Latin America North";
            break;
        case "las":
            return "Latin America South";
            break;
        case "na":
            return "North America";
            break;
        case "oce":
            return "Oceania";
            break;
        case "ru":
            return "Russia";
            break;
        case "tr":
            return "Turkey";
            break;
    }
},
getSplash: function(){
    return splashes[Math.floor(Math.random() * splashes.length)];
}

};