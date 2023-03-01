const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'help [command]',
    category: 'Misc',
    run: async (interaction, client, db) => {
        
    }
}

module.exports.data = new SlashCommand()
    .setName('help')
    .setDescription('Tells you all the commands')