const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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
    comments: [{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment',
        required: false
    }]
})

// methods
UserSchema.methods = {
    //hash text password
    hashPassword: function (plainTextPassword) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(plainTextPassword, salt)
    },
    //check password enetered matches the one in the database
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    }
}

UserSchema.pre('save', function(next) {
    if (!this.password){
        next()
    } else {
        this.password = this.hashPassword(this.password)
        console.log(this.password)
        next()
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User