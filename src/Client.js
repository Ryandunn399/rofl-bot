const Discord = require('discord.js');

// Function to define event class to import and load here
const reqEvent = (event) => require(`./events/${event}`);

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

        this.token = config.token;
    }


    /**
     * Load our events into the client.  This is currently a working guideline for loading
     * events from other classes, in this instance we have created and loaded
     * the 'on_ready' event listener through a module.
     */
    loadEvents() {
        let event = reqEvent('ready');
        // register event
        super.on('ready', event.bind(null, this));
    }
}

module.exports = Client;