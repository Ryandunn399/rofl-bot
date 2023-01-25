# rofl-bot
rofl-bot is an open-source discord bot written as a multi function discord bot to cover an array of uses including moderation, utility, and games.  As of right now, however, the primary functionality is to serve as a way to stream YouTube audio after the latest streak of large Discord bots had such functionality removed.

## Installation

First, clone the repository
```
git clone https://github.com/Ryandunn399/rofl-bot.git
```
Then run the node package manager to install dependencies
```
npm install
```

# Setup
Before we can actually run rofl-bot, we need to setup a config file for local variables.
```
{
  "token": "[enter api token here]"
}
```

# Documentation
For more information regarding Discord's JavaScript library, visit the api [here](https://discord.js.org/#/docs/main/stable/general/welcome) or the intro guide [here](https://discordjs.guide/)

# Troubleshooting
- Error on media player (ffmpeg not found)
```
npm install ffmpeg-static
npm install @discordjs/opus
npm install ytdl-core
```
