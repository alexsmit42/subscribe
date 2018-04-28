const Telegraf = require('telegraf')
const config = require('config')

let bot = new Telegraf(config.get('bot.token'));

bot.start((ctx) => {
    const message = `Hello, ${ctx.from.first_name}!`
    return ctx.reply(message);
});

bot.startPolling();