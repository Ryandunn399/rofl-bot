/**
 * Base class template for commands.
 */
class Command {

    /**
     * Class constructor.
     * @param {*} client 
     * @param {*} options 
     */
    constructor(client, options) {

        /**
         * Bot client.
         */
        this.client = client;

        /**
         * Name of the command.
         */
        this.name = options.name;

        /**
         * Usage of command.
         */
        this.usage = options.usage;
    }

    /**
     * Main functionality of the command.
     */
    run() {
        throw new Error(`The command ${this.name} has no functionality!`);
    }

    showUsage(message) {
        message.channel.send(`Usage: !${this.name} ${this.usage}`);
    }
}

module.exports = Command;