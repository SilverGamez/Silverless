module.exports = {
    event: 'interactionCreate',
    async run(interaction, client, db) {
        if (interaction.isButton()) {
            interaction.deferUpdate();
            require('../handlers/Button')(interaction);
        }

        if (!interaction.isCommand()) return;

        const {
            commandName
        } = interaction;

        const command = client.commands.get(commandName);
        if (!command) return

        if (command.BotDevOnly && interaction.user.id !== client.config.BotConfig.botdev) return;

        try {
            await command.run(interaction, client, db);
        } catch (e) {
            console.log(e);
        }
    }
}