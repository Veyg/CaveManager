const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent] });
client.login('MTE2MjM1NTA0NTgyMDU0Mjk3Ng.G8fA1s.t9peVbqFqwLfqM3YdUYQKxRVPtjN2jodWp8NHE');
const YOUR_GUILD_ID = '1161654425723617314';
client.once('ready', () => {
    console.log('Bot is online!');

    // Fetch roles from a specific guild
    const guild = client.guilds.cache.get(YOUR_GUILD_ID);  // Use the constant directly
    if (guild) {
        guild.roles.fetch()
            .then(roles => {
                console.log('Roles in the guild:');
                roles.cache.forEach(role => {
                    console.log(role.name, role.id);
                });
            })
            .catch(console.error);
    }
});