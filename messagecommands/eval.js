const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');

module.exports = {
    name: 'eval',
    description: 'Run code on the bot',
    usage: 'eval <code>',
    category: 'messagecommands',
    BotDevOnly: true,
    run: async (message, args, client, db) => {
        const code = args.join(" ");

        try {
            let output = await util.inspect((await eval(code)));

            if (output.includes(client.config.BotConfig.token)) output = output.replace(client.config.BotConfig.token, "bot_token");

            if (code.length > 1024) code = "Code has too many characters. Please use under 1024 characters."

            if (output.length > 1024) {
                fs.writeFileSync('./output.sh', output);

                await message.channel.send({
                    embeds: [
                        new Discord.EmbedBuilder()
                        .setTitle('Evaled')
                        .setColor(client.embedColor)
                        .addFields({
                            name: 'Code',
                            value: "```js\n" + code + "```"
                        }, {
                            name: 'Output',
                            value: "Output is over embed character limited. Adding an atachment below."
                        })
                    ],
                    files: [{
                        attachment: './output.sh',
                        name: 'output.sh'
                    }]
                });

                setTimeout(() => {
                    fs.unlink('./output.sh', function (error) {
                        if (error) return console.log(error);
                    });
                }, 1000);
            }

            const embed = new Discord.EmbedBuilder()
                .addFields({
                    name: 'Code',
                    value: "```js\n" + code + "```"
                }, {
                    name: 'Output',
                    value: "```sh\n" + output + "```"
                })
                .setColor(client.embedColor)

            message.channel.send({
                embeds: [embed]
            });

        } catch (error) {
            const embed = new Discord.EmbedBuilder()
                .addFields({
                    name: 'Code',
                    value: "```js\n" + code + "```"
                }, {
                    name: 'Error',
                    value: "```sh\n" + error + "```"
                })
                .setColor(client.embedColor)

            message.channel.send({
                content: "There was an error doing that.",
                embeds: [embed]
            });
        }
    }
}