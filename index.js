const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.login('MTE2MjM1NTA0NTgyMDU0Mjk3Ng.G8fA1s.t9peVbqFqwLfqM3YdUYQKxRVPtjN2jodWp8NHE');

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async message => {
    console.log(`Received message from ${message.author.tag}: ${message.content}`);
    console.log(`Received message: ${message.content}`);
    if (message.content === '!test') {
        message.reply('Test successful!');
    }    
    if (message.content === '!setupReactionRoles') {
        const reactionMessage = await message.channel.send("React to get a role!");

        const emojis = {
            '🦉': '1162388253270360195',  // Swift
            '🐹': '1162388258756497409',  // Go
            '☕': '1162388244223230054',  // Java
            '🐘': '1162388249134768266',  // PHP
            '🐚': '1162388264645316691',  // Shell/Bash
            '🟦': '1162388241761181839',  // JavaScript
            '📊': '1162388262762065981',  // R
            '💽': '1162388261675741315',  // SQL
            '🦀': '1162388260652318810',  // Rust
            '🔺': '1162388270185988156',  // Scala
            '🎯': '1162388255992463501',  // Dart
            '🔵': '1162388257305276536',  // TypeScript
            '🔱': '1162388246169399306',  // C++
            '💎': '1162388251592630373',  // Ruby
            '📈': '1162388266352390185',  // MATLAB
            '🍃': '1162388254427992184',  // Kotlin
            '🐍': '1162388242931404860',  // Python
            '🌙': '1162388269120639077',  // Lua
            '🐪': '1162388267967193158',  // Perl
            '♯': '1162388247872286800'   // C#
        };

        for (const emoji in emojis) {
            await reactionMessage.react(emoji);
        }
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Fetching reaction failed: ', error);
            return;
        }
    }

    const { message } = reaction;
    const member = message.guild.members.cache.get(user.id);
    const emojis = {
            '🦉': '1162388253270360195',  // Swift
            '🐹': '1162388258756497409',  // Go
            '☕': '1162388244223230054',  // Java
            '🐘': '1162388249134768266',  // PHP
            '🐚': '1162388264645316691',  // Shell/Bash
            '🟦': '1162388241761181839',  // JavaScript
            '📊': '1162388262762065981',  // R
            '💽': '1162388261675741315',  // SQL
            '🦀': '1162388260652318810',  // Rust
            '🔺': '1162388270185988156',  // Scala
            '🎯': '1162388255992463501',  // Dart
            '🔵': '1162388257305276536',  // TypeScript
            '🔱': '1162388246169399306',  // C++
            '💎': '1162388251592630373',  // Ruby
            '📈': '1162388266352390185',  // MATLAB
            '🍃': '1162388254427992184',  // Kotlin
            '🐍': '1162388242931404860',  // Python
            '🌙': '1162388269120639077',  // Lua
            '🐪': '1162388267967193158',  // Perl
            '♯': '1162388247872286800'   // C#
    };

    if (emojis[reaction.emoji.name]) {
        member.roles.add(emojis[reaction.emoji.name]);
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Fetching reaction failed: ', error);
            return;
        }
    }

    const { message } = reaction;
    const member = message.guild.members.cache.get(user.id);
    const emojis = {
            '🦉': '1162388253270360195',  // Swift
            '🐹': '1162388258756497409',  // Go
            '☕': '1162388244223230054',  // Java
            '🐘': '1162388249134768266',  // PHP
            '🐚': '1162388264645316691',  // Shell/Bash
            '🟦': '1162388241761181839',  // JavaScript
            '📊': '1162388262762065981',  // R
            '💽': '1162388261675741315',  // SQL
            '🦀': '1162388260652318810',  // Rust
            '🔺': '1162388270185988156',  // Scala
            '🎯': '1162388255992463501',  // Dart
            '🔵': '1162388257305276536',  // TypeScript
            '🔱': '1162388246169399306',  // C++
            '💎': '1162388251592630373',  // Ruby
            '📈': '1162388266352390185',  // MATLAB
            '🍃': '1162388254427992184',  // Kotlin
            '🐍': '1162388242931404860',  // Python
            '🌙': '1162388269120639077',  // Lua
            '🐪': '1162388267967193158',  // Perl
            '♯': '1162388247872286800'   // C#
    };

    if (emojis[reaction.emoji.name]) {
        member.roles.remove(emojis[reaction.emoji.name]);
    }
});