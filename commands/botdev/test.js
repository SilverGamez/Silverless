const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'test',
    category: 'test',
    run: async (interaction, client, db) => {
        interaction.reply("Test message");
        console.log(db.data);
    }
}

module.exports.data = new SlashCommand()
    .setName('test')
    .setDescription('test')