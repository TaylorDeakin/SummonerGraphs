# Summoner Graphs
The GitHub repository for Summoner Graphs, a website that compares your mastery score to your winrate.

[Click here](summonergraphs.com/oce/summoner/KingAmles/2016) for an example of what the site does

## Setting up your own copy

If you'd like to mess around with Summoner Graphs, you'll need an API key, which you can get from [Riot Games](http://developer.riotgames.com) 

Currently, the site is set up to find an api key in a file named "private.js", which has the following format
``` javascript
module.exports = {
    apiKey: "api-key-here",
}

```

