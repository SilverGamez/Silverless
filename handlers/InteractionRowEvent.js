const Discord = require('discord.js');

module.exports = async (client) => {
    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        //Help menu
        if (interaction.customId == 'HelpSelect') {
            await interaction.update({content: "Something was selected!", embeds: [], components: []});
        }
    });
}