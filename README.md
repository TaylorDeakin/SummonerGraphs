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

## The Idea

When Riot introduced champion masteries back in 2015, I thought it would be a cool idea to compare winrates to mastery scores, and see if a higher mastery score really resulted in a better player. A few months later, this became Summoner Graphs, a website that calcuates champion winrates, and compares them to champion mastery scores, before displaying everything on a graph.

## The Implementation

Initially Summoner Graphs was written in PHP, and was best described as a mess. It was a monster to mainain, and I wasn't really happy with how it looked either. Earlier this year I found NodeJS, and now I have rewritten the site. You can check out the source code on Github. It's not perfect, but it's much better than it was.

## Disclaimer

Summoner Graphs isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
