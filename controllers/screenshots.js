//require
const db = require('../models')

//controllers
// index show create update destroy
const index = (req, res) => {
    db.Screenshot.find({}, (err, foundScreenshots) => {
        if (err) console.log(`error in Screenshots#index: ${err}`)
        //res.send('Screenshots index called!')
        res.status(200).json({screenshots: foundScreenshots})
    })
}

const show = (req,res) => {
    db.Screenshot.findById(req.params.id, (err, foundScreenshot) => {
        if (err) console.log(`error in Screenshots#show: ${err}`)
        //res.send(`Screenshot show called`)
        res.status(200).json({screenshot: foundScreenshot})
    })
}

const create = (req, res) => {
    db.Screenshot.create(req.body, (err,createdScreenshot) => {
        if (err) console.log(`error in Screenshots#create: ${err}`)
        //res.send(`Screenshot create called`)
        res.status(200).json({screenshot: createdScreenshot})
    })
}

const update = (req, res) => {
    db.Screenshot.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedScreenshot) => {
        if (err) console.log(`error in Screenshots#update: ${err}`)
        //res.send(`Screenshot update called`)
        res.status(200).json({
            Screenshot: updatedScreenshot,
            //message: `${updatedScreenshot.title} updated succesfully`
        })
    })
}

const destroy = (req, res) => {
    db.Screenshot.findByIdAndDelete(req.params.id, (err, deletedScreenshot) => {
        if (err) {
            console.log(`error in Screenshots#destroy: ${err}`)
            res.send(`Screenshot destroy error`)
        } else {
            res.send(`Screenshot deleted successfully`)
        }
    })
}

//export
// index show create update destroy
module.exports = {
    index,
    show,
    create,
    update,
    destroy
}