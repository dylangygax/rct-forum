const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Image file*/ name*/ story/ USER*/ PARK/ comments: user, body/ date
const ScreenshotSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},//just a url for now
    story: {type: String, required: false},
    datePublished: {type: Date, required: false},// may want to set required to true later
    park: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Screenshot',
        required: false
    },
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Parks',
        required: true
    }
})

const Screenshot = mongoose.model('Screenshot', ScreenshotSchema)
module.exports = Screenshot