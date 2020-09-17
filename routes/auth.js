// imports
const router = require('express').Router()
const ctrl = require('../controllers')
const passport = require('../passport') 


// router
//path: apli/v1/auth
router.post('/register', ctrl.auth.register)
router.post('/login', passport.authenticate('local'), ctrl.auth.login)
//router.delete('/logout', ctrl.auth.logout)

// exports
module.exports = router