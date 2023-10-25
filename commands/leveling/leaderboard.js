const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const User = require('../../models/User.js');

module.exports = {
    name: 'leaderboard',
    description: 'Displays the top users based on XP.',
    async execute(message) {
        const usersPerPage = 10;
        let page = 1;

        const topUsers = await User.findAll({
            order: [['xp', 'DESC']],
            limit: usersPerPage
        });

        const embed = new MessageEmbed()
            .setTitle('🏆 XP Leaderboard')
            .setColor('#F8AA2A')
            .setFooter(`Page ${page}`, message.guild.iconURL());

        topUsers.forEach((user, index) => {
            embed.addField(`#${index + 1} ${user.discordId}`, `Level: ${user.level} | XP: ${user.xp}`);
        });

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle('PRIMARY')
            );

        const leaderboardMessage = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = leaderboardMessage.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'previous') {
                page = Math.max(page - 1, 1);
            } else if (interaction.customId === 'next') {
                page++;
            }

            const topUsers = await User.findAll({
                order: [['xp', 'DESC']],
                offset: (page - 1) * usersPerPage,
                limit: usersPerPage
            });

            embed.fields = [];
            topUsers.forEach((user, index) => {
                embed.addField(`#${(page - 1) * usersPerPage + index + 1} ${user.discordId}`, `Level: ${user.level} | XP: ${user.xp}`);
            });
            embed.setFooter(`Page ${page}`, message.guild.iconURL());

            await interaction.update({ embeds: [embed] });
        });
    }
};