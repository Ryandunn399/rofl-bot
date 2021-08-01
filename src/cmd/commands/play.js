const Command = require('../Command');

/**
 * This command will allow the user to play a video through the voice channel.
 */
module.exports = class PlayCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'play',
            usage: '[youtube url]'
        })
    }

    async run (message, args) {
        if (args.length != 2)
            return this.showUsage(message);

        const url = args[1];
        const mediaPlayer = this.client.media;
        mediaPlayer.addMedia(message, url);

        if (!mediaPlayer.playing) 
            mediaPlayer.play(message);
    }
}