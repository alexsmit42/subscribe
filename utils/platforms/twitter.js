const Platform = require('./platform')
let TwitterApi = require('twitter')
let config = require('config')

class Twitter extends Platform {
    getType() {
        return 'twitter'
    }

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
            channel = await this._client.get('users/show', {screen_name: channelName})
        } catch (err) {
            return false
        }

        return {
            channelID: channel.id_str,
            channelName: channel.screen_name,
            title: channel.name,
            url: `https://twitter.com/${channel.screen_name}`,
            type: this.getType(),
            lastID: channel.status.id_str
        }
    }

    async getPosts(channel) {
        let posts = []
        try {
            posts = await this._client.get('statuses/user_timeline', {user_id: channel.channelID, since_id: channel.lastID})
        } catch(err) {
            return []
        }

        posts = posts.map(post => {
            return {
                postID: post.id_str,
                title: '',
                text: post.text,
                url: `${channel.url}/status/${post.id_str}`,
                createDate: post.created_at,
                channel
            }
        })

        posts.sort((a, b) => {
            if (a.postID > b.postID) {
                return -1
            }

            return 1
        })

        return posts
    }
}

module.exports = Twitter
