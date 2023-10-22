module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        console.log(`New member joined: ${member.user.tag}`);

        // Check if the member is a bot, if so, return
        if (member.user.bot) {
            console.log(`Member ${member.user.tag} is a bot. Exiting.`);
            return;
        }

        // Use the provided role ID to fetch the role
        const memberRole = member.guild.roles.cache.get('1162388240360292504');

        if (!memberRole) {
            console.error(`Couldn't find the role with ID 1162388240360292504`);
            return;
        }

        // If the role exists, assign it to the member
        member.roles.add(memberRole).then(() => {
            console.log(`Assigned the role to ${member.user.tag}`);
        }).catch(error => {
            console.error(`Error assigning role to ${member.user.tag}: `, error);
        });
    }
};
