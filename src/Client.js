const Discord = require('discord.js');
const MusicPlayer = require('./utils/MusicPlayer');
const {readdirSync} = require('fs');
const {join, resolve} = require('path');

// Function to define event class to import and load here
const reqEvent = (event) => require(`./events/${event}`);

const commandDir = './src/cmd';

/**
 * rofl-bot custom client
 */
class Client extends Discord.Client {
    /**
     * Client constructor.
     * @param {*} config 
     */
    constructor(config, options = {}) {
        super(options);

        /**
         * Bot token.
         */
        this.token = config.token;

        /**
         * A collection of bot commands.
         */
        this.commands = new Discord.Collection();

        this.media = new MusicPlayer();
    }


    /**
     * Load our events into the client.  This is currently a working guideline for loading
     * events from other classes, in this instance we have created and loaded
     * the 'on_ready' event listener through a module.
     */
    loadEvents() {
        let readyEvent = reqEvent('ready');
        let messageEvent = reqEvent('message');
        // register event
        super.on('ready', readyEvent.bind(null, this));
        super.on('message', messageEvent.bind(null, this));
    }

    /**
     * Load our commands into the client by collecting all js classes in the 
     * cmd/commands directory.
     */
    loadCommands() {
        readdirSync(commandDir).filter(f => !f.endsWith('.js')).forEach(dir => {
            console.log(dir);
            const commands = readdirSync(resolve(__maindir, join(commandDir, dir))).filter(f => f.endsWith('js'));
            commands.forEach(f => {
                const Command = require(resolve(__maindir, join(commandDir, dir, f)));
                const command = new Command(this);
                this.commands.set(command.name, command);
            })
        })
    }
}

module.exports = Client;