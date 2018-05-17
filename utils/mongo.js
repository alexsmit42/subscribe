let mongoose = require('./mongoose')

let {Channel, Post} = require('../models')

let mongo = {

    getChannels: (ids) => {
        ids = ids || null

        if (ids) {
            return Channel.find({'_id': {'$in': ids}})
        }

        return Channel.find({})
    },

    getChannel: (channelID, type) => {
        return Channel.findOne({channelID, type})
    },

    saveChannel: (channel) => {
        channel['_id'] = new mongoose.Types.ObjectId()
    
        return Channel.create(channel)
    },

    updateLastID: (channel, lastID) => {
        return Channel.findOneAndUpdate({_id: channel._id}, {$set: {lastID}}, {overwrite: true}).then()
    },

    savePosts: (channel, posts) => {
        posts = posts.map(post => {
            return {
                _id: new mongoose.Types.ObjectId(),
                channel: mongoose.Types.ObjectId(channel._id),
                ...post
            }
        })

        return Post.insertMany(posts, {ordered: false, continueOnError: true})
    }
}

module.exports = mongo