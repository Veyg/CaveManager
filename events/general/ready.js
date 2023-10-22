const config = require('../../config.json');

module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        
        if (config.reactionMessage) {
            const reactionChannel = client.channels.cache.get(config.reactionMessage.channelId);
            if (reactionChannel) {
                reactionChannel.messages.fetch(config.reactionMessage.messageId).catch(error => {
                    console.error("Couldn't fetch the reaction message!", error);
                });
            }
        }
    }
};