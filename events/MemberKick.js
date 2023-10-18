module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 20,  // Use the numerical value for MEMBER_KICK
        });
        const kickLog = fetchedLogs.entries.first();

        if (kickLog) {
            const { executor, target } = kickLog;
            if (target.id === member.id) {
                const logChannel = member.guild.channels.cache.get('1162388374787731528');
                logChannel.send(`${member.user.tag} was kicked by ${executor.tag}.`);
            }
        }
    }
};
