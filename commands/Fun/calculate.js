const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');
const math = require('mathjs');

module.exports = {
    usage: 'calculate <math equation>',
    category: 'Fun',
    run: async (interaction, client, db) => {
        const equation = interaction.options.getString("equation");
        let resp;

        try {
            resp = math.evaluate(equation)
        } catch (error) {

            const embed = new Discord.EmbedBuilder()
                .setTitle('That is not a __valid__ question')
                .setColor(client.embedColor)
                .setDescription("Please use a valid math symbol:\n\n` * Multiplication\n / Division\n + Addition\n - Subtraction`")
            return interaction.reply({
                embeds: [embed]
            });

        }

        const embed = new Discord.EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle('Calculator')
            .addFields({
                name: 'Question',
                value: "```css\n" + equation + "```"
            }, {
                name: 'Answer',
                value: "```css\n" + resp + "```"
            })

        interaction.reply({
            embeds: [embed]
        });

    }
}

module.exports.data = new SlashCommand()
    .setName('calculate')
    .setDescription('Works like a calculator')
    .addStringOption(option => option.setName("equation").setDescription("Provide a math equation. For example: 1+1").setRequired(true))