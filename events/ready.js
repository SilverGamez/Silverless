const chalk = require('chalk').default;
const discord = require('discord.js');

module.exports = {
    event: 'ready',
    async run(client, db) {
        const time = Math.floor(Math.round() * 3000) + 750
        setTimeout(() => {
            console.log(chalk.red(`[Bot]`) + chalk.whiteBright(` Bot is loading`));
            setTimeout(() => {
                console.log(chalk.red(`[Bot]`) + chalk.whiteBright(` Bot is loaded`));

                
            }, time);
        }, 1000);
        client.guilds.cache.forEach(guild => {
            require(`../handlers/loadCommands`)(client, guild.id);
        });

        client.user.setActivity("/help", {type: 2})
    }
}