const SlashCommand = require('@discordjs/builders').SlashCommandBuilder;
const Discord = require('discord.js');

module.exports = {
    usage: 'createembed',
    category: 'Mod',
    run: async (interaction, client, db) => {
        let modperms = interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)
        let editing = false;

        if (modperms == true) {
            let channel = interaction.channel;

            let embed1 = new Discord.EmbedBuilder()
                .setDescription("_ _")
                .setColor(client.embedColor)

            const embed2 = new Discord.EmbedBuilder()
                .setTitle('EMBED EDITOR')
                .setColor(client.embedColor)
                .setDescription(`Click below buttons to edit embed\n\nCurrent Channel: <#${channel.id}>`)

            const comp1 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_title')
                    .setLabel('Title')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_description')
                    .setLabel('Description')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_colour')
                    .setLabel('Colour')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_timestamp')
                    .setLabel('Timestamp')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_thumbnail')
                    .setLabel('Thumbnail')
                    .setStyle('Secondary'),
                )

            const comp2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_footer')
                    .setLabel('Footer')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_author')
                    .setLabel('Author')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_image')
                    .setLabel('Image')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_url')
                    .setLabel('Title URL')
                    .setStyle('Secondary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_channel')
                    .setLabel('Channel')
                    .setStyle('Secondary')
                )

            const comp3 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_done')
                    .setLabel('Finished')
                    .setStyle('Success'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_edit')
                    .setLabel('Edit embed')
                    .setStyle('Primary'),
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_cancel')
                    .setLabel('Delete')
                    .setStyle('Danger'),
                )

            const comp4 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId('embed_load')
                    .setLabel('Load embed')
                    .setStyle('Secondary'),
                )

            let e = await interaction.reply({
                content: "EXAMPLE EMBED",
                embeds: [embed1, embed2],
                components: [comp1, comp2, comp4, comp3]
            });

            let filterC = (m) => {
                return m.user.id == interaction.user.id;
            }

            let filter = (m) => m.author.id == interaction.user.id;

            const collector = interaction.channel.createMessageComponentCollector({
                filterC
            });

            collector.on('collect', async (m) => {
                if (m.user.id == interaction.user.id) {
                    let comp = m.customId.replace('embed_', '');

                    if (comp == 'done') {
                        interaction.deleteReply();
                        channel.send({
                            embeds: [embed1]
                        });
                        db.set(`embeds.${m.message.id}`, embed1);
                        interaction.channel.send({
                            content: "Embed complete, embed id: " + m.message.id
                        })
                        collector.emit('end');
                    }

                    if (comp == 'cancel') {
                        interaction.deleteReply();
                        let e = await interaction.channel.send("Deleting...");
                        setTimeout(() => {
                            e.delete();
                        }, 5000);
                        collector.emit('end');
                    }

                    if (comp == 'load') {
                        let e = await interaction.channel.send("Please send embed id to load");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            let embd = await db.get(`embeds.${i.content}`);

                            if (embd) {
                                embed1 = new Discord.EmbedBuilder(embd);

                                e.delete()
                                i.delete();

                                let z = await interaction.channel.send("Embed loaded");

                                setTimeout(() => {
                                    z.delete();
                                }, 1000);

                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            } else return interaction.channel.send("That embed doesnt exist!");
                        });
                    }

                    if (comp == 'edit') {
                        let e = await interaction.channel.send("Please send a embed id to edit");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            let v = await interaction.channel.send("Please mention the channel the embed is in");
                            const cl = interaction.channel.createMessageCollector({
                                filter: filter,
                                max: 1
                            });

                            cl.on('collect', async (b) => {
                                try {
                                    let message = await b.mentions.channels.first().messages.fetch(i.content);

                                    await message.edit({
                                        embeds: [embed1]
                                    });

                                    await interaction.deleteReply();
                                    let m = await interaction.channel.send("Embed updated.");

                                    setTimeout(() => {
                                        m.delete();
                                    }, 5000);

                                    e.delete();
                                    i.delete();
                                    v.delete();
                                    b.delete();
                                } catch (error) {
                                    interaction.channel.send("An error occured doing that!");
                                    console.log(error)
                                }
                            })
                        });
                    }

                    if (comp == 'title') {
                        let e = await interaction.channel.send("What do you want as your title?");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            embed1.setTitle(i.content);
                            e.delete();
                            i.delete();

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'description') {
                        let e = await interaction.channel.send("What do you want as your description?");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            embed1.setDescription(i.content);
                            e.delete();
                            i.delete();

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'colour') {
                        let e = await interaction.channel.send("What do you want as your description? (HEX CODE https://htmlcolorcodes.com/)");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            embed1.setColor(i.content);
                            e.delete();
                            i.delete();

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'timestamp') {
                        let e = await interaction.channel.send("Enable timestamp? True/False");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            if (i.content == "true") {
                                embed1.setTimestamp(Date.now());
                            } else if (i.content == "false") {
                                embed1.setTimestamp(false);
                            }

                            e.delete();
                            i.delete();

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'thumbnail') {
                        let e = await interaction.channel.send("What do you want as your thumbnail (IMAGE URL)");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            e.delete();
                            i.delete();
                            embed1.setThumbnail(i.content);

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'channel') {
                        let e = await interaction.channel.send("What channel do you want to send the embed? (MENTION CHANNEL)");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            e.delete();
                            i.delete();
                            channel = i.mentions.channels.first() || i.channel;
                            embed2.setDescription(`Click below buttons to edit embed\n\nCurrent Channel: <#${channel.id}>`);

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'footer') {
                        let e = await interaction.channel.send("What do you want as your Footer Text?");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            let v = await interaction.channel.send("What do you want as your Footer Picture? Say `null` to set none");
                            const c = interaction.channel.createMessageCollector({
                                filter: filter,
                                max: 1
                            });

                            c.on('collect', async (a) => {
                                console.log(i.content)
                                console.log(a.content)
                                if (a.content == "null") embed1.setFooter({
                                    text: i.content
                                });
                                if (a.content !== "null") embed1.setFooter({
                                    text: i.content,
                                    iconURL: a.content
                                });
                                v.delete();
                                a.delete();
                                e.delete();
                                i.delete();

                                setTimeout(async () => {
                                    await interaction.editReply({
                                        content: "EXAMPLE EMBED",
                                        embeds: [embed1, embed2],
                                        components: [comp1, comp2, comp4, comp3]
                                    });
                                }, 100);
                            })
                        });
                    }

                    if (comp == 'author') {
                        let e = await interaction.channel.send("What do you want as your Author Text?");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            let v = await interaction.channel.send("What do you want as your Author Picture? Say `null` to set none");
                            const c = interaction.channel.createMessageCollector({
                                filter: filter,
                                max: 1
                            });


                            c.on('collect', async (a) => {
                                if (a.content == "null") embed1.setAuthor({
                                    name: i.content
                                });
                                if (a.content !== "null") embed1.setAuthor({
                                    name: i.content,
                                    iconURL: a.content
                                });
                                v.delete();
                                a.delete();
                                e.delete();
                                i.delete();

                                setTimeout(async () => {
                                    await interaction.editReply({
                                        content: "EXAMPLE EMBED",
                                        embeds: [embed1, embed2],
                                        components: [comp1, comp2, comp4, comp3]
                                    });
                                }, 100);
                            })
                        });
                    }

                    if (comp == 'image') {
                        let e = await interaction.channel.send("What do you want as your image (IMAGE URL)");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            e.delete();
                            i.delete();
                            embed1.setImage(i.content);

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }

                    if (comp == 'url') {
                        let e = await interaction.channel.send("What do you want as your title url");
                        const c = interaction.channel.createMessageCollector({
                            filter: filter,
                            max: 1
                        });

                        c.on('collect', async (i) => {
                            e.delete();
                            i.delete();
                            embed1.setURL(i.content);

                            setTimeout(async () => {
                                await interaction.editReply({
                                    content: "EXAMPLE EMBED",
                                    embeds: [embed1, embed2],
                                    components: [comp1, comp2, comp4, comp3]
                                });
                            }, 100);
                        });
                    }
                }
            });
        } else {
            return interaction.reply("You must be an mod/admin to use this");
        }
    }
}

module.exports.data = new SlashCommand()
    .setName('createembed')
    .setDescription('Create a embed builder')