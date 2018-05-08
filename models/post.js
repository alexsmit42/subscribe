const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = Schema({
    _id: Schema.Types.ObjectId,
    postID: {
        type: String,
        required: true
    },
    title: String,
    text: String,
    url: String,
    createDate: Date,
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    }
})

postSchema.index({"postID": 1, "channel": 1}, {"unique": true})

module.exports = mongoose.model('Post', postSchema)