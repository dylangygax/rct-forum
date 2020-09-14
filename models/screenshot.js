const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Image file*/ name*/ story/ USER*/ PARK/ comments: user, body/ date
//REQUIRED: title, image, user
const ScreenshotSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},//just a url for now
    story: {type: String, required: false},
    datePublished: {type: Date, required: false},// may want to set required to true later
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    park: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Park',
        required: false
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment',
        required: false
    }]
})

const Screenshot = mongoose.model('Screenshot', ScreenshotSchema)
module.exports = Screenshot