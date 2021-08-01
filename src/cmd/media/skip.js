const Command = require('../Command');

module.exports = class SkipCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'skip',
            usage: ''
        })
    }

    run (message) {
        const mediaPlayer = this.client.media;
        if(!message.member.voice.channel)
            return message.channel.send('You have to be in a voice channel to run this command!');

        if (!mediaPlayer.isPlaying)
            return message.channel.send(`${message.member} there is nothing currently playing!`);

        if (!mediaPlayer.connection == null)
            return console.log('Connection is currently null?');

        mediaPlayer.connection.dispatcher.end();
    }
}