/**
 * Insert notes here
 */
module.exports = async (client, message) => {
    // Ignore messages not from guilds
    if (!message.guild || message.author.bot) return;

    // Check to see if the message is a command.
    if (message.content.charAt(0) == '!') {
        const cmdArgs = message.content.trim().split(' ');
        const cmd = cmdArgs[0].substring(1);
        
        if (client.commands.has(cmd)) {
            const command = client.commands.get(cmd);
            command.run(message);
        }
    }
}