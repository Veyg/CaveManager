module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        const categoryID = '1162397118011543713';

        // Mapping of placeholder channel IDs to name prefixes
        const channelNameMapping = {
            '1162388376981360751': '🎙️ General talks with',
            '1162388383574802462': '🎵 Chillin and vibin with',
            '1162388379493744801': '👥 Coding with'
        };

        // Check if the user joined one of the placeholder channels
        if (channelNameMapping[newState.channelId]) {
            console.log('User joined a placeholder channel');

            // Construct the new channel name based on the placeholder channel they joined
            const newChannelName = `${channelNameMapping[newState.channelId]} ${newState.member.displayName}`;

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
        if (oldState.channel && (oldState.channel.name.startsWith('🎙 General talks with') || oldState.channel.name.startsWith('🎵 Chillin and vibin with') || oldState.channel.name.startsWith('👥 Coding with')) && oldState.channel.members.size === 0) {
            oldState.channel.delete().catch(console.error);
        }
    }
};
