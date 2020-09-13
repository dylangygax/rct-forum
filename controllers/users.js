//require
const db = require('../models')

//controllers
// index filter show create update destroy
const index = (req, res) => {
    db.User.find({}, (err, foundUsers) => {
        if (err) console.log(`error in users#index: ${err}`)
        res.send('users index called!')
    })
}

//export
// index filter show create update destroy
module.exports = {
    index
}