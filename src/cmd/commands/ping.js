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
            name: 'ping'
        })
    }

    async run (message) {
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setTimestamp();

        message.channel.send('Pong!');
    }
}