
let parser = {
    parseSubscribe(subscribeString) {
        let channel = {
            type: '',
            title: ''
        }

        if (subscribeString.indexOf('twitter') !== -1) {
            channel.type = 'twitter'
            channel.title = subscribeString.match(/twitter.com\/(\w+)/)[1]
        } else if (subscribeString.indexOf('@') !== -1) {
            channel.type = 'twitter'
            channel.title = subscribeString.substr(1)
        }

        return channel
    }
}

module.exports = parser