const Discord = require('discord.js');

const client = new Discord.Client({
    intents: new Discord.IntentsBitField(32767),
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const config = require('./config.json');

client.commands = new Discord.Collection();
client.config = config;

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

process.on('unhandledRejection', async (reason) => {
    console.log(reason);
});

client.login(config.token)