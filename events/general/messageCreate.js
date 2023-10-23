const User = require('../../models/User.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // If the message is from a bot, ignore it
        if (message.author.bot) return;

        // Command execution logic
        if (message.content.startsWith('!')) {
            const commandName = message.content.split(' ')[0].slice(1);
            const command = client.commands.get(commandName);
            if (command) {
                command.execute(message);
            }
        }

        // XP gain logic
        // Fetch user from the database or create if not exists
        const user = await User.findOrCreate({ where: { discordId: message.author.id } });
        const userData = user[0];  // findOrCreate returns an array with the user instance and a created boolean

        // Add XP
        userData.xp += 2;  // Add 2 XP for each message

        // Level up logic
        const xpToNextLevel = userData.level * 100;
        if (userData.xp >= xpToNextLevel) {
            userData.level += 1;  // Increase the level by 1
            userData.xp -= xpToNextLevel;  // Reset the XP, but keep the overflow

            // Notify the user
            message.channel.send(`${message.author}, congratulations! You've leveled up to level ${userData.level}! 🎉`);
        }

        await userData.save();
    }
};
