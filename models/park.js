const mongoose = require('mongoose')
const Schema = mongoose.Schema

//file*/ name*/ story/ USER*/ overview pic*/ SCREENSHOTS/ comments/ bool: published?/ date
const ParkSchema = new Schema({
    parkName: {type: String, required: true},
    //file here
    story: {type: String, required: false},
    overviewPic: {type: String, required: true}, //for now this is a URL
    isPublished: {type: Boolean, required: false, default: false},
    datePublished: {type: Date, required: false},
    screenshots: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Screenshot',
        required: false
    }],
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Parks',
        required: true
    }
})

const Park = mongoose.model('Park', ParkSchema)
module.exports = Park