module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember, client) {
        if (!oldMember.premiumSince && newMember.premiumSince) {
            const logChannel = newMember.guild.channels.cache.get('1162388374787731528');
            logChannel.send(`${newMember.user.tag} has boosted the server. Thank you for your support!`);

            const generalChannel = newMember.guild.channels.cache.get('YOUR_GENERAL_CHANNEL_ID');
            generalChannel.send(`Thank you ${newMember} for boosting our server! 🚀`);
        }
    }
};
