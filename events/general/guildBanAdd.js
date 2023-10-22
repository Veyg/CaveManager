// events/guildBanAdd.js
module.exports = {
    name: 'guildBanAdd',
    async execute(guild, user, client) {
        const logChannel = guild.channels.cache.get('1162388374787731528');
        if (!logChannel) return;
        logChannel.send(`🔨 ${user.tag} has been banned from the server.`);
    }
};
