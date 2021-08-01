const Command = require('../Command');

module.exports = class PlayCommand extends Command {

    constructor(client) {
        super(client, {
            name: 'play'
        })
    }

    async run (message) {
        
    }
}