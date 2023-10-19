const { Client, GatewayIntentBits } = require('discord.js');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        const placeholderChannelID = '1162388376981360751';
        const categoryID = '1162397118011543713';

        // Check if the user joined the placeholder channel
        if (newState.channelId === placeholderChannelID) {
            console.log('User joined the placeholder channel');

            // Construct the new channel name
            const newChannelName = `Coding with ${newState.member.displayName}`;

            try {
                // Create the new channel within the specified category
                const newChannel = await newState.guild.channels.create({
                    name: newChannelName,
                    type: 2,  // 2 represents GUILD_VOICE
                    parent: categoryID
                });

                // Move the member to the new channel
                newState.setChannel(newChannel);

            } catch (error) {
                console.error('Error creating new voice channel:', error);
            }
        }

        // Cleanup: If a dynamically created channel is empty, delete it
        if (oldState.channel && oldState.channel.name.startsWith('Coding with') && oldState.channel.members.size === 0) {
            oldState.channel.delete().catch(console.error);
        }
    }
};
