const Discord = require('discord.js');

const client = new Discord.Client({
    intents: new Discord.IntentsBitField(3276799),
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const config = require('./config.json');

client.commands = new Discord.Collection();
client.messagecommands = new Discord.Collection();

client.config = config;
client.embedColor = config.EmbedConfig.Color;

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

process.on('unhandledRejection', async (reason) => {
    console.log(reason);
});

client.login(config.BotConfig.token)