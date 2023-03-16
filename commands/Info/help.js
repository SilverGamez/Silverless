const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'help [command]',
    category: 'Info',
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
            const embeds = {
                Fun: new Discord.EmbedBuilder().setColor(client.embedColor).setTitle('Fun commands'),
                Misc: new Discord.EmbedBuilder().setColor(client.embedColor).setTitle('Misc commands'),
                Info: new Discord.EmbedBuilder().setColor(client.embedColor).setTitle('Info commands'),
                Mod: new Discord.EmbedBuilder().setColor(client.embedColor).setTitle('Mod commands'),
                Money: new Discord.EmbedBuilder().setColor(client.embedColor).setTitle('Money commands') 
            }

            let commands = client.commands;
            commands = Array.from(commands).map(([name, value]) => ({
                name,
                value
            }));

            commands.forEach(command => {
                embeds[command.value.category].addFields({
                    name: "➣ " + command.name,
                    value: command.value.data.description + "\n"
                })
            });

            let mEmbeds = [];
            mEmbeds = Object.values(embeds)

            interaction.reply({
                embeds: mEmbeds
            });
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