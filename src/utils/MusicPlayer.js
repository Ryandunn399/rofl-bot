const ytdl = require('ytdl-core');
const {MessageEmbed} = require('discord.js');

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
        const url = this.queue[0].url;
        const user = this.queue[0].user;
        const avatar = this.queue[0].avatar;

        const songInfo = (await ytdl.getInfo(url));//.videoDetails.title;

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

        const time = this.convertSeconds(songInfo.videoDetails.lengthSeconds);
        //message.channel.send(`Current playing ${songInfo}`);
        const embed = new MessageEmbed()
            .setAuthor('Now Playing')
            .setURL(url)
            .setTitle(songInfo.videoDetails.title)
            .setThumbnail(`https://img.youtube.com/vi/${songInfo.videoDetails.videoId}/maxresdefault.jpg`)
            .setFooter(user, avatar);  
        message.channel.send(embed);
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

        this.queue.push(new SongRequest(url, message.member.displayName, message.author.displayAvatarURL({dynamic: true})));
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

    /**
     * Convert time seconds (int) to minutes:seconds format (str)
     * @param {*} value 
     * @returns 
     */
    convertSeconds(value) {
        var time = parseInt(value);
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        return (minutes.toString() + ":" + seconds.toString().padStart(2, '0'));
    }
}

/**
 * Class to store which user sent a song request.
 */
class SongRequest {

    constructor(url, user, avatar) {
        this.url = url;
        this.user = user;
        this.avatar = avatar;
    }
}

module.exports = MusicPlayer;