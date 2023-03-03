module.exports = {
    event: 'messageCreate',
    async run(message, client, db) {
        if (message.author.bot) return;
        if (!message.guild) return;

        if (!message.content.startsWith('-')) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice('-'.length).trim().split(' ')
        const cmd = args.shift().toLowerCase();

        if (cmd.length == 0) return;
        let command = client.messagecommands.get(cmd);

        if (command.BotDevOnly && message.author.id !== client.config.BotConfig.botdev) return message.channel.send("This command is limited to botdev only.");

        try {
            command.run(message, args, client, db)
        } catch (error) {
            console.log(error);
        }
    }
}