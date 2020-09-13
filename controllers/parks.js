//require
const db = require('../models')

//controllers
// index filter show create update destroy
const index = (req, res) => {
    db.Park.find({}, (err, foundParks) => {
        if (err) console.log(`error in parks#index: ${err}`)
        //res.send('parks index called!')
        res.status(200).json({parks: foundParks})
    })
}

const show = (req,res) => {
    db.Park.findById(req.params.id, (err, foundPark) => {
        if (err) console.log(`error in parks#show: ${err}`)
        //res.send(`park show called`)
        res.status(200).json({park: foundPark})
    })
}

const create = (req, res) => {
    db.Park.create(req.body, (err,createdPark) => {
        if (err) console.log(`error in parks#create: ${err}`)
        //res.send(`park create called`)
        res.status(200).json({park: createdPark})
    })
}

const update = (req, res) => {
    db.Park.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPark) => {
        if (err) console.log(`error in parks#update: ${err}`)
        //res.send(`park update called`)
        res.status(200).json({
            park: updatedPark,
            //message: `${updatedpark.parkname} updated succesfully`
        })
    })
}

const destroy = (req, res) => {
    db.Park.findByIdAndDelete(req.params.id, (err, deletedPark) => {
        if (err) {
            console.log(`error in parks#destroy: ${err}`)
            res.send(`park destroy error`)
        } else {
            res.send(`park deleted successfully`)
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