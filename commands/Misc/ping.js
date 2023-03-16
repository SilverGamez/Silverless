const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'ping',
    category: 'Misc',
    run: async (interaction, client, db) => {
        const ping1 = Math.round(Date.now() - interaction.createdTimestamp);
        const ping2 = Math.round(client.ws.ping);

        const embed = new Discord.EmbedBuilder()
            .setColor(client.embedColor)
            .addFields(
                {
                    name: 'Bots ping is',
                    value: `${ping1} ms`,
                    inline: true
                },
                {
                    name: 'API ping is',
                    value: `${ping2} ms`
                }
            )

        interaction.reply({
            embeds: [embed]
        });
    }
}

module.exports.data = new SlashCommand()
    .setName('ping')
    .setDescription('Pong!')