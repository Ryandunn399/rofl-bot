/**
 * Main application script of our bot.
 */
const { Intents } = require('discord.js');
const Client = require('./src/Client.js');
const config = require('./config.json');

const intents = new Intents();

// Our custom client object
const client = new Client(config);

client.loadEvents();
client.loadCommands();
console.log(__dirname);

// Initialize client functions
client.login(client.token);