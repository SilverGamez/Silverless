const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'balance [@user]',
    category: 'Money',
    run: async (interaction, client, db) => {
        let user = interaction.options.getUser('user');
        if (user == null || !user) user = interaction.user;

        let purse = await db.get(`${user.id}.purse`);
        let bank = await db.get(`${user.id}.bank`);

        if (purse == null) purse = 0;
        if (bank == null) bank = 0;

        const embed = new Discord.EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`${user.username}'s Balance`)
            .setDescription(`Purse: ${Number(purse).toLocaleString()} coins\nBank ${Number(bank).toLocaleString()} coins`)

        interaction.reply({
            embeds: [embed]
        });
    }
}

module.exports.data = new SlashCommand()
    .setName('balance')
    .setDescription('Get your/someones balance')
    .addUserOption(option => option.setName("user").setDescription("Users balance to view"))