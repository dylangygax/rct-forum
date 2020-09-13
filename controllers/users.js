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

const show = (req,res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) console.log(`error in users#show: ${err}`)
        res.send(`user show called`)
        //res.status(200).json({user: foundUser})
    })
}

const create = (req, res) => {
    db.User.create(req.body, (err,createdUser) => {
        if (err) console.log(`error in users#create: ${err}`)
        res.send(`user create called`)
        //res.status(200).json({user: createdUser})
    })
}

const update = (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
        if (err) console.log(`error in users#update: ${err}`)
        res.send(`user update called`)
        // res.status(200).json({
        //     user: updatedUser,
        //     //message: `${updatedUser.username} updated succesfully`
        // })
    })
}

const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) {
            console.log(`error in users#destroy: ${err}`)
            res.send(`user destroy error`)
        } else {
            res.send(`user deleted successfully`)
        }
    })
}

//export
// index filter show create update destroy
module.exports = {
    index,
    show,
    create,
    update,
    destroy
}