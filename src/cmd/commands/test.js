const Command = require('../Command');
const ytdl = require('ytdl-core');

const songUrl = 'https://www.youtube.com/watch?v=kTJczUoc26U';

module.exports = class TestCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'test'
        })
    }

    async run (message) {
        if (!message.member.voice.channel) return;

        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(songUrl, {filter:'audioonly'}));

        dispatcher.setVolume(1.0);
    }
}