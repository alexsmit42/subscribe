const config = require('config')
const Platform = require('./platforms')

let parser = require('./parser')
let mongo = require('./mongo')
let redis = require('./redis')
let telegram = require('./telegram')

let utils = {
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getPlatforms: () => {
        let platforms = Object.keys(config.get('platforms'))
        for (let platform of platforms) {
            let platformObj = new Platform(platform)
        }
    },

    async updatePosts() {
        let channels = await mongo.getChannels()

        channels.forEach(async (channel) => {
            let platformObj = new Platform(channel.type)
            let actualChannel = await platformObj.getChannel(channel.channelName)
            mongo.updateLastID(channel, actualChannel.lastID)
            
            let posts = await platformObj.getPosts(channel)
            let followers = await redis.channelFollowers(channel._id)

            followers.forEach((follower) => {
                telegram.sendPosts(follower, posts)
            })
            // mongo.savePosts(channel, posts)
        })
    },

    async followChannel(subscribeString, userID) {
        // parse user's string
        let subscribeChannel = parser.parseSubscribe(subscribeString)

        if (!subscribeChannel.title) {
            return false
        }

        let platformObj = new Platform(subscribeChannel.type)

        if (!platformObj) {
            return false
        }

        // get channel info
        let channel = await platformObj.getChannel(subscribeChannel.title)

        if (!channel) {
            return false
        }

        // save channel if need
        let newChannel = await mongo.getChannel(channel.channelID, channel.type)

        if (!newChannel) {
            newChannel = await mongo.saveChannel(channel)
        }

        redis.followChannel(newChannel._id.toString(), userID)

        return newChannel
    },

    unfollowChannel(channelID, userID) {
        return redis.unfollowChannel(channelID, userID)
    },

    async getUserChannels(userID) {
        let channels = await redis.userFollows(userID)
        channels = await mongo.getChannels(channels)
        
        return channels
    }
}

module.exports = utils