const fs = require('fs');

const emojis = {
    '<:swift:1162725530513190955>': '1162388253270360195',
    '<:go:1162727602184798208>': '1162388258756497409',
    '<:java:1162725455175106591>': '1162388244223230054',
    '<:php:1162725747727794186>': '1162388249134768266',
    '<:sh:1162726188020670516>': '1162388264645316691',
    '<:javascript:1162720239444840448>': '1162388241761181839',
    '<:rlang:1162726274075205632>': '1162388262762065981',
    '<:sql:1162725872034394152>': '1162388261675741315',
    '<:rust:1162726274075205632>': '1162388260652318810',
    '<:scala:1162725932243628132>': '1162388270185988156',
    '<:dart:1162727289663016981>': '1162388255992463501',
    '<:typescript:1162726158991896676>': '1162388257305276536',
    '<:cplusplus:1162725342696448180>': '1162388246169399306',
    '<:ruby:1162725572972138537>': '1162388251592630373',
    '<:matlab:1162729320612102195>': '1162388266352390185',
    '<:kotlin:1162725687229153302>': '1162388254427992184',
    '<:python:1162720241785245808>': '1162388242931404860',
    '<:lua:1162729633888866324>': '1162388269120639077',
    '<:perl:1162729529576521728>': '1162388267967193158',
    '<:csharp:1162726972770762802>': '1162388247872286800'
};
module.exports = {
    name: 'setupReactionRoles',
    description: 'Sets up reaction roles',
    async execute(message, client) {
        const reactionMessage = await message.channel.send("Choose your expertise! React to the corresponding emoji to get your role");

        for (const emoji in emojis) {
            await reactionMessage.react(emoji);
        }

        // Load the current config
        const config = require('../config.json');

        // Store the message ID and channel ID in the config
        config.reactionMessage = {
            messageId: reactionMessage.id,
            channelId: reactionMessage.channel.id
        };

        // Write the updated config back to the file
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
    }
};