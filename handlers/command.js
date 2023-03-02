const fs = require('fs');
const chalk = require('chalk').default;

module.exports = async (client) => {
    fs.readdirSync('./commands').forEach(dir => {
        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.data.name, command);
            console.log(chalk.blue(`[Command]`) + chalk.whiteBright(` ${command.data.name} has loaded`));
        }
    });

    const messagecommands = fs.readdirSync(`./messagecommands/`).filter(file => file.endsWith('.js'));

    for (const file of messagecommands) {
        const command = require(`../messagecommands/${file}`);
        client.messagecommands.set(command.name, command);
        console.log(chalk.blue(`[Command]`) + chalk.whiteBright(` ${command.name} has loaded`));
    }
}