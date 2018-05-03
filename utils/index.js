const config = require('config')
const Twitter = require('./platforms/twitter')

let parser = require('./parser')
let mongo = require('./mongo')
let redis = require('./redis')

const classes = {
    'twitter': Twitter
}

let utils = {
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getPlatforms: () => {
        let platforms = Object.keys(config.get('platforms'))
        for (let platform of platforms) {
            let platformObj = new classes[platform]()
            platformObj.getPosts(2233154425, 990753753853775872).then(posts => {
                console.log(posts)
            })
        }
    },

    async followChannel(subscribeString, userID) {
        // parse user's string
        let subscribeChannel = parser.parseSubscribe(subscribeString)

        if (!subscribeChannel.title) {
            return false
        }

        let platform = subscribeChannel.type
        let platformObj = new classes[platform]()

        if (!platformObj) {
            return false
        }

        // get channel info
        let channel = await platformObj.getChannel(subscribeChannel.title)

        if (!channel) {
            return false
        }

        // save channel if need
        let dbChannel = await mongo.getChannel(channel)
        if (!dbChannel) {
            mongo.saveChannel(channel)
                .then(channel => redis.followChannel(channel._id, userID))
        }
    }
}

module.exports = utils