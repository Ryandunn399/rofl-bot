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
    }

    /**
     * Main functionality of the command.
     */
    run() {
        throw new Error(`The command ${this.name} has no functionality!`);
    }
}

module.exports = Command;