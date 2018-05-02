const Platform = require('./index')
let TwitterApi = require('twitter')
let config = require('config')

class Twitter extends Platform {
    
    getClient() {
        return new TwitterApi({
            consumer_key: config.get('platforms.twitter.consumer_key'),
            consumer_secret: config.get('platforms.twitter.consumer_secret'),
            access_token_key: config.get('platforms.twitter.access_token_key'),
            access_token_secret: config.get('platforms.twitter.access_token_secret')
        })
    }

    async getChannel(channelName) {
        let channel = false
        try {
            channel = await this._client.get('users/lookup', {screen_name: channelName})
        } catch (err) {
            return {}
        }

        return {
            id: channel[0].id_str,
            title: channel[0].name,
            url: `https://twitter.com/${channel[0]['screen_name']}`,
            type: 'twitter'
        }
    }

    async getPosts(channelID, lastID) {
        let posts = []
        try {
            posts = await this._client.get('statuses/user_timeline', {user_id: channelID, since_id: lastID, exclude_replies: true, include_rts: false})
        } catch(err) {
            return []
        }

        return posts
    }
}

module.exports = Twitter
