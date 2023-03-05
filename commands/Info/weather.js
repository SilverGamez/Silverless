const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    usage: 'water <location?',
    category: 'Info',
    run: async (interaction, client, db) => {
        weather.find({search: interaction.options.getString("location"), degreeType: 'C'}, function (error, result){
            if (error) return interaction.reply({content: error});

            if (result == undefined || result.length == 0) return interaction.reply({content: "Location not found."});

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo =  new Discord.EmbedBuilder()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(client.embedColor)
                .addFields(
                    {
                        name: 'Timezone',
                        value: `UTC${location.timezone}`,
                        inline: true
                    },
                    {
                        name: 'Degree Type',
                        value: `Celsius`,
                        inline: true
                    },
                    {
                        name: 'Temperature',
                        value: `${current.tempature}C°`,
                        inline: true
                    },
                    {
                        name: 'Wind',
                        value: `${current.winddisplay}`,
                        inline: true
                    },
                    {
                        name: 'Feels like',
                        value: `${current.feellike}C°`,
                        inline: true
                    },
                    {
                        name: 'Humidity',
                        value: `${current.humidity}%`,
                        inline: true
                    },
                    
                )

                interaction.reply({embeds: [weatherinfo]});
        });
    }
}

module.exports.data = new SlashCommand()
    .setName('weather')
    .setDescription('Shows you the weather of [location]')
    .addStringOption(option => option.setName("location").setDescription("Location of weather").setRequired(true))