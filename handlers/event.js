const fs = require('fs');
const chalk = require('chalk').default;

const SilverDB = require('silver-db');
const db = new SilverDB();

db.delete("key");

module.exports = async (client) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.event, (...args) => event.run(...args, client, db));
            console.log(chalk.yellowBright(`[Event]`) + chalk.whiteBright(` ${event.event} loaded`));s
        } else {
            client.on(event.event, (...args) => event.run(...args, client, db));
            console.log(chalk.yellowBright(`[Event]`) + chalk.whiteBright(` ${event.event} loaded`));
        }
    }
}