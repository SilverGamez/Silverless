const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'avatar [user]',
    category: 'Misc',
    run: async (interaction, client, db) => {
        let user = interaction.options.getUser("user");
        if (!user) user = interaction.user;

        const embed = new Discord.EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`${user.username}'s avatar`)
            .setImage(user.displayAvatarURL())

        interaction.reply({
            embeds: [embed]
        });
    }
}

module.exports.data = new SlashCommand()
    .setName('avatar')
    .setDescription('Show someones avatar')
    .addUserOption(option => option.setName("user").setDescription("User avatar to see"))