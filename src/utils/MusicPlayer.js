const ytdl = require('ytdl-core');

/**
 * This module will handle the playing and queing of songs for our media player.
 */
class MusicPlayer {

    constructor() {
        this.queue = new Array();

        this.playing = false;

        this.connection = null;
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
            message.channel.send('ERROR: Nothing in playlist');
        }

        // get the latest url from the queue.
        const url = this.queue[0];
        const songInfo = (await ytdl.getInfo(url)).videoDetails.title;

        this.playing = true;

        this.connection = await message.member.voice.channel.join();
        const dispatcher = this.connection.play(ytdl(url, {filter:'audioonly'}))
            .on('finish', () => {
                this.queue.shift();
                if (this.queue.length <= 0) {
                    this.playing = false;
                    message.channel.send('The queue is finished!');
                } else {
                    this.play(message);   
                }
            })
            .on('error', error => console.error(error));

        message.channel.send(`Current playing ${songInfo}`);
    }

    /**
     * Will attempt to add the media url link if ytdl is able to validate it.
     * @param {*} message 
     * @param {*} url 
     * @returns 
     */
    async addMedia(message, url) {
        if (!url) {
            console.log('There was no url to parse!');
            return;
        }

        if (!ytdl.validateURL(url)) {
            console.log('YTDL was unable to validate the url!');
            return;
        }

        this.queue.push(url);
        const songInfo = (await ytdl.getInfo(url)).videoDetails.title;
        
        if (this.isPlaying)
            message.channel.send(`You have queued ${songInfo}!`);
    }

    /**
     * Will return true if the media player is currently playing something, otherwise false.
     * @returns 
     */
    isPlaying() {
        return this.playing;
    }
}

module.exports = MusicPlayer;