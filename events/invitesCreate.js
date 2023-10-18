module.exports = {
    name: 'inviteCreate',
    execute(invite, client) {
        const logChannel = invite.guild.channels.cache.get('1162388374787731528');
        logChannel.send(`Invite created by ${invite.inviter.tag}. Code: ${invite.code}`);
    }
};
