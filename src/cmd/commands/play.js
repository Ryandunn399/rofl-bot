const Command = require('../Command');

module.exports = class PlayCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'play',
            usage: '[youtube url]'
        })
    }

    async run (message, args) {
        console.log(args.length);
        if (args.length != 2)
            return this.showUsage(message);

        for (let i = 0; i < args.length; i++)
            console.log(i + ' ' + args[i]);

        const url = args[1];
        const mediaPlayer = this.client.media;
        console.log(`URL is: ${url}`);
        mediaPlayer.addMedia(message, url);

        if (!mediaPlayer.playing)
            mediaPlayer.play(message);
    }
}