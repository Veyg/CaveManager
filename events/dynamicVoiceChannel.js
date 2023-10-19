const placeholderChannelID = '1162388376981360751';

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        console.log("Voice state update detected");

        // Check if the user joined the placeholder channel
        if (newState.channelId === placeholderChannelID) {
            console.log("User joined the placeholder channel");

            const user = newState.member.user;
            const guild = newState.guild;

            // Logging the user object for debugging purposes
            console.log(user);

            try {
                // Fetch channels to ensure they're cached
                await guild.channels.fetch();

                // Use a hardcoded string for the channel name
                const channelName = "Hardcoded Name";
                console.log("Constructed channel name:", channelName); // Log the constructed name

                // Create the new voice channel
                const newChannel = await guild.channels.create(channelName, {
                    type: 'GUILD_VOICE'
                });

                // Move the user to the new voice channel
                newState.setChannel(newChannel);

                // Cleanup: Delete the channel when the last user leaves
                newChannel.on('voiceStateUpdate', async (oldChannelState, newChannelState) => {
                    if (newChannel.members.size === 0) {
                        await newChannel.delete();
                    }
                });

            } catch (error) {
                console.error("Error creating new voice channel:", error);
                console.log(JSON.stringify(error, null, 2)); // Log the entire error object
            }
        }
    }
};
