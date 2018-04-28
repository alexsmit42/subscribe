let redis = require('redis')
let bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

let config = require('config')

let redisClient = redis.createClient({db: config.get('redis.db')})