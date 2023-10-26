require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const sequelize = require('./database.js');
const User = require('./models/User.js');
const ShopItem = require('./models/ShopItem.js');

const client = new Client({
    intents: [
        GatewayIntentBits.GUILDS,
        GatewayIntentBits.GUILD_MEMBERS,
        GatewayIntentBits.GUILD_MESSAGES,
        GatewayIntentBits.GUILD_MESSAGE_REACTIONS,
        GatewayIntentBits.MESSAGE_CONTENT,
        GatewayIntentBits.GUILD_VOICE_STATES
    ]
});

console.log("Starting bot...");

client.commands = new Map();

// Recursively load commands from the commands directory and its subdirectories
function loadCommands(dir) {
    console.log(`Accessing directory for commands: ${dir}`);
    const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    const subDirectories = fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isDirectory());

    for (const file of commandFiles) {
        const filePath = `${dir}/${file}`;
        console.log(`Attempting to load command from: ${filePath}`);
        const command = require(`./${filePath}`);
        client.commands.set(command.name, command);
    }

    for (const subDir of subDirectories) {
        loadCommands(`${dir}/${subDir}`);
    }
}

function loadEvents(dir) {
    console.log(`Accessing directory for events: ${dir}`);
    const eventFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    const subDirectories = fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isDirectory());

    for (const file of eventFiles) {
        const filePath = `${dir}/${file}`;
        console.log(`Attempting to load event from: ${filePath}`);
        const event = require(`./${filePath}`);
        client.on(event.name, (...args) => event.execute(...args, client));
    }

    for (const subDir of subDirectories) {
        loadEvents(`${dir}/${subDir}`);
    }
}

loadCommands('./commands');
loadEvents('./events');

// Sync the database
sequelize.sync().then(() => {
    console.log("Database synced!");
    return client.login(process.env.DISCORD_BOT_TOKEN);
}).catch(error => {
    console.error("Error syncing the database:", error);
});
