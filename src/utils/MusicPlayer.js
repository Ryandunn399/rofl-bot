const ytdl = require('ytdl-core');

/**
 * This module will handle the playing and queing of songs for our media player.
 */
class MusicPlayer {

    constructor() {
        this.queue = new Array();

        this.playing = false;
    }

    /**
     * Function will make the bot play media from the top of our queue map.
     * @param {*} channel 
     */
    async play(message) {
        if(!message.member.voice.channel) {
            console.error('Bot attempted to join a channel that doesn\'t exist!');
            return;
        }

        if(this.queue.length == 0) {
            console.error('There isn\'t any music currently in the queue!');
            return;
        }

        // get the latest url from the queue.
        const url = this.queue[0];
        const songInfo = (await ytdl.getInfo(url)).videoDetails.title;

        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(url, {filter:'audioonly'}))
            .on('finish', () => {
                this.queue.shift();
                this.play(message.member.voice.channel);
            })
            .on('error', error => console.error(error));

        message.channel.send(`Current playing ${songInfo}`);
        this.playing = true;
    }

    addMedia(message, url) {
        console.log(url);
        if (!url) {
            console.log('There was no url to parse!');
            return;
        }

        if (!ytdl.validateURL(url)) {
            console.log('YTDL was unable to validate the url!');
            return;
        }

        this.queue.push(url);
    }

    hasQueue() {
        return this.queue.length > 0;
    }

    isPlaying() {
        return this.playing;
    }
}

module.exports = MusicPlayer;