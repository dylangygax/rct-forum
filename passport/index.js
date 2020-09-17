const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/user')

//called when user logs in
passport.serializeUser((user, done) => {
    //console.log('yee')
    done(null, user._id)
}) 

//called when a logged in user makes request
passport.deserializeUser((id, done) => {
    //console.log('yeet')
    User.findById(id, 'email', (err, user) => {
        if (err) return done(err, null)
        done(null, user)
    })
})

passport.use(LocalStrategy)
module.exports = passport