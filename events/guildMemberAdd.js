module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const logChannel = member.guild.channels.cache.get('1162388374787731528');
        if (!logChannel) return;
        logChannel.send(`📥 ${member.user.tag} has joined the server.`);
    }
};