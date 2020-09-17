const User = require('../models/user')

const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
    //set "username" (unique identifier) for passport
    {usernameField: 'username'},
    //function to verify user
    function(username, password, done) {
        User.findOne({username: username}, (err, foundUser) => {
            if (err) return done(err)
            if (!foundUser) return done(null, false, {message: 'Invalid credentials'})
            if (!foundUser.checkPassword(password)) return done(null, false, {message: 'Invalid credentials'})
            console.log('success')
            return done(null, foundUser)
        })
    }
)

module.exports = strategy