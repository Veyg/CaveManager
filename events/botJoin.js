module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        if (member.user.bot) {
            const logChannel = member.guild.channels.cache.get('1162388374787731528');
            logChannel.send(`Bot ${member.user.tag} has joined the server.`);
        }
    }
};
