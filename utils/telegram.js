const Telegraf = require('telegraf')
const config = require('config')

const Telegram = require('telegraf/telegram')
const telegram = new Telegram(config.get('bot.token'))

let botApi = {
    sendPosts: (chatID, posts) => {
        posts.forEach(post => {

            let message = [
                // `<b>${post.channel.title}</b> (${post.channel.type})`,
                // '',
                // post.text,
                // '',
                `<a href="${post.url}">Go to original post</a>`
            ].join('<pre>\r\n</pre>')


            telegram.sendMessage(chatID, message, {parse_mode: 'html'})
        });
    }
}

module.exports = botApi