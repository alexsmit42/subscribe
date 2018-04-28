const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema({
    _id: Schema.Types.ObjectId,
    postID: Number,
    title: String,
    text: String,
    url: String,
    createDate: Date,
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }
})

module.exports = mongoose.model('Post', postSchema)