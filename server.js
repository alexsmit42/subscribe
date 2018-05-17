const Telegraf = require('telegraf')
const config = require('config')

const Markup = require('telegraf/markup');

let api = require('./utils')

let bot = new Telegraf(config.get('bot.token'))

bot.start((ctx) => {
    const message = `Hello, ${ctx.from.first_name}!`
    return ctx.reply(message)
});

bot.command('unfollow', (ctx) => {
    api.getUserChannels(ctx.from.id).then(
        channels => {
            if (!channels.length) {
                return ctx.reply("You don't follow any channels")
            }

            let lines = channels.map(channel => {
                return [Markup.callbackButton(`${channel.title} (${channel.type})`, JSON.stringify({_id: channel._id}))]
            })

            return ctx.reply('Choose channel for unfollow:',
                Markup.inlineKeyboard(lines).extra()
            )
        }
    )
})

bot.command('myfollows', (ctx) => {
    api.getUserChannels(ctx.from.id).then(
        channels => {
            if (!channels.length) {
                return ctx.reply("You don't follow any channels")
            }

            let lines = channels.map(channel => {
                return `<b>${channel.title}</b> (${channel.type})`
            })

            return ctx.replyWithHTML(lines.join('<pre>\r\n</pre>'))
        }
    )
})

bot.hears(/(.+)/, (ctx) => {
    let msg = ctx.match[0]

    api.followChannel(msg, ctx.from.id).then(
        channel => {
            if (channel) {
                return ctx.reply(`You are to follow the channel "${channel.title}"`)
            } else {
                return ctx.reply('Something wrong...')
            }
        }
    )

})

bot.on('callback_query', (ctx) => {
    let data = false;
    try {
        data = JSON.parse(ctx.update.callback_query.data);
    } catch (err) {
        console.log(err);
    }

    let user = ctx.from.id;

    if (data._id !== undefined) {
        api.unfollowChannel(data._id, user)
        // TODO: Check correct unfollow
        return ctx.reply(`You are to unfollow the channel`)
    }
});

bot.startPolling();