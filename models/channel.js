const mongoose = require('mongoose')
const Schema = mongoose.Schema

let channelSchema = new Schema({
    _id: Schema.Types.ObjectId,
    channelID: String,
    title: String,
    url: String,
    type: String 
})

module.exports = mongoose.model('Channel', channelSchema)