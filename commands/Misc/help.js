const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'help [command]',
    category: 'Misc',
    run: async (interaction, client, db) => {
        if (interaction.options.getSubcommand() == 'command_info') {
            const input = interaction.options.getString("command").toLowerCase();

            let command = client.commands.get(input);
            if (command == null) return interaction.reply("Command `" + input + "` doesn't exist. Try checking the spelling or use `/help list`");

            const embed = new Discord.EmbedBuilder()
                .setTitle('Info on command')
                .setColor(client.embedColor)
                .addFields({
                    name: 'Name',
                    value: command.data.name
                }, {
                    name: 'Description',
                    value: command.data.description
                }, {
                    name: 'Usage',
                    value: command.usage
                }, {
                    name: 'Category',
                    value: command.category
                })
                .setFooter({
                    text: interaction.guild.name,
                    iconURL: interaction.guild.iconURL()
                })

            interaction.reply({
                embeds: [embed]
            });
        }

        if (interaction.options.getSubcommand() == 'list') {
            const SelectEmbed = new Discord.EmbedBuilder()
                .setDescription("Select a category of commands you would like to look through.")
                .setColor(client.embedColor)

            const SelectRow = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('HelpSelect')
                    .setPlaceholder('Select a category')
                    .addOptions(
                        {
                            label: 'Fun',
                            description: 'Fun commands',
                            value: 'HelpSelect1'
                        },
                        {
                            label: 'Misc',
                            description: 'Just unsorted commands',
                            value: 'HelpSelect2'
                        }
                    )
            )    

            interaction.reply({embeds: [SelectEmbed], components: [SelectRow]});
        }
    }
}

module.exports.data = new SlashCommand()
    .setName('help')
    .setDescription('Tells you all the commands')
    .addSubcommand(subcommand =>
        subcommand
        .setName("command_info")
        .setDescription("Get information on a specific command")
        .addStringOption(option => option.setName("command").setDescription("Command name").setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName("list")
        .setDescription("List all commands"))