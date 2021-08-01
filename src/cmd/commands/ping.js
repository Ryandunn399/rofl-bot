const Command = require('../Command');
const {MessageEmbed} = require('discord.js');

/**
 * Example command template, command will make bot respond with a message.
 */
module.exports = class PingCommand extends Command {

    /**
     * Class constructor
     * @param {*} client 
     */
    constructor (client) {
        super(client, {
            name: 'ping',
            usage: '[num 1-2]'
        })
    }

    async run (message, args) {
        console.log(args.length);
        if (args.length < 2)
            return super.showUsage(message);
        
        const num = args[1];
        if (num == 1)
            return message.channel.send('Pong one!');

        if (num == 2)
            return message.channel.send('Pong two!');

        message.channel.send('Pong!');
    }
}