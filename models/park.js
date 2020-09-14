const mongoose = require('mongoose')
const Schema = mongoose.Schema

//file*/ name*/ story/ USER*/ overview pic*/ SCREENSHOTS/ comments/ bool: published?/ date
//REQUIRED: parkName, overviewPic, user
const ParkSchema = new Schema({
    parkName: {type: String, required: true},
    //file here
    story: {type: String, required: false},
    overviewPic: {type: String, required: true}, //for now this is a URL
    isPublished: {type: Boolean, required: false, default: false},
    datePublished: {type: Date, required: false},
    user: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    screenshots: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Screenshot',
        required: false
    }],
    comments: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment',
        required: false
    }]
})

const Park = mongoose.model('Park', ParkSchema)
module.exports = Park