const mongoose = require('mongoose')
const Schema = mongoose.Schema

let channelSchema = Schema({
    _id: Schema.Types.ObjectId,
    channelID: String,
    channelName: String,
    title: String,
    url: String,
    lastID: String,
    type: String 
})

module.exports = mongoose.model('Channel', channelSchema)