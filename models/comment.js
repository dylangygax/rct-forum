const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    body: {type: String, required: false},
    datePublished: {type: Date, required: false},// may want to set required to true later
    park: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Park',
        required: false
    },
    screenshot: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Screenshot',
        required: false
    }
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment