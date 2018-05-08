const Telegraf = require('telegraf')
const config = require('config')

let api = require('./utils')

let bot = new Telegraf(config.get('bot.token'))

bot.start((ctx) => {
    const message = `Hello, ${ctx.from.first_name}!`
    return ctx.reply(message)
});

bot.command('unfollow', (ctx) => {
    return ctx.reply('unfollow')
})

bot.hears(/(.+)/, (ctx) => {
    let msg = ctx.match[0]

    api.followChannel(msg, ctx.from.id).then(
        channel => {
            if (channel) {
                return ctx.reply(`You are follow to channel "${channel.title}"`)
            } else {
                return ctx.reply('Something wrong...')
            }
        }
    )

})

bot.startPolling();