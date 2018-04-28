let {Channel, Post} = require('../models')

let mongo = {

    getChannel: (channelID, type) => {
        return Channel.findOne({channelID, type})
    },

    saveChannel: (channel) => {
        channel['_id'] = new mongoose.Types.ObjectId()
    
        return Channel.create(channel)
    },
}

module.exports = mongo