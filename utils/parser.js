
let parser = {
    parseSubscribe(subscribe) {
        let channel = {
            type: '',
            title: ''
        }

        if (subscribe.indexOf('twitter') !== -1) {
            channel.type = 'twitter'
            channel.title = subscribe.match(/twitter.com\/(\w+)/)[1]
        } else if (subscribe.indexOf('@') !== -1) {
            channel.type = 'twitter'
            channel.title = subscribe.substr(1)
        }

        return channel
    }
}

module.exports = parser