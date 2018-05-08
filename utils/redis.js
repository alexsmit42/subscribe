let redis = require('redis')
let bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

let config = require('config')

let redisClient = redis.createClient({db: config.get('redis.db')})

let redisApi = {
    followChannel: (id, userID) => {
        redisClient.multi()
            .sadd(`users:${userID}:follows`, id)
            .sadd(`channels:${id}:followers`, userID)
            .exec()
    },

    unfollowChannel: (id, userID) => {
        redisClient.srem(`users:${userID}:follows`, id)
        redisClient.srem(`channels:${id}:followers`, userID)
    },

    userFollows: (userID) => {
        return redisClient.smembersAsync(`users:${userID}:follows`)
    },
    
    channelFollowers: (id) => {
        return redisClient.smembersAsync(`channels:${id}:followers`)
    }
}

module.exports = redisApi