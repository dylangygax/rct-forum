const mongoose = require('mongoose')
const Schema = mongoose.Schema

//username*/ bio?/ SCREENSHOTS/ PARKS/ type? User or Admin
//REQUIRED: username
const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    bio: {type: String, required: false},
    isAdmin: {type: Boolean, required: false, default: false},
    screenshots: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Screenshot',
        required: false
    }],
    parks: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Park',
        required: false
    }],
})

const User = mongoose.model('User', UserSchema)
module.exports = User