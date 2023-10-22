require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

console.log("Starting bot...");

client.commands = new Map();

// Recursively load commands from the commands directory and its subdirectories
function loadCommands(dir) {
    console.log(`Accessing directory for commands: ${dir}`);
    const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = `${dir}/${file}`;
        if (fs.statSync(filePath).isDirectory()) {
            loadCommands(filePath);
        } else {
            console.log(`Attempting to load command from: ${filePath}`);
            const command = require(`./${filePath}`);
            client.commands.set(command.name, command);
        }
    }
}

// Recursively load events from the events directory and its subdirectories
function loadEvents(dir) {
    console.log(`Accessing directory for events: ${dir}`);
    const eventFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = `${dir}/${file}`;
        if (fs.statSync(filePath).isDirectory()) {
            loadEvents(filePath);
        } else {
            console.log(`Attempting to load event from: ${filePath}`);
            const event = require(`./${filePath}`);
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

loadCommands('./commands');
loadEvents('./events');

client.login(process.env.DISCORD_BOT_TOKEN).catch(error => {
    console.error("Failed to login:", error);
});
