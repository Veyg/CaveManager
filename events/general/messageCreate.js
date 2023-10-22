module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (message.content.startsWith('!')) {
            const commandName = message.content.split(' ')[0].slice(1);
            const command = client.commands.get(commandName);
            if (command) {
                command.execute(message);
            }
        }
    }
};
