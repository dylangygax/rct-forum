//require
const db = require('../models')

//controllers
// index show create update destroy
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

const create = async (req, res) => {
    // db.Park.create(req.body, (err,createdPark) => {
    //     if (err) console.log(`error in parks#create: ${err}`)
    //     //res.send(`park create called`)
    //     res.status(200).json({park: createdPark})
    // })
    const createdPark = await db.Park.create(req.body)
    const userUpdateObject = { $push: {parks: createdPark._id}}
    const foundUser = await db.User.findByIdAndUpdate(createdPark.user, userUpdateObject, {new: true})
    //CHECK WHETHER THIS IS BEST PRACTICE
    createdPark.screenshots.forEach(async (screenshotId) => {
        let foundScreenshot = await db.Screenshot.findByIdAndUpdate(screenshotId, {park: createdPark._id}, {new: true})
    })
    res.status(200).json({park: createdPark, user: foundUser})
}

//CONSIDER?: should add park to screenshots if those are included. As of now you cannot update a park's screenshots from the parks update function
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

//TO DO: delete all the park's comments
const destroy = async (req, res) => {
    // db.Park.findByIdAndDelete(req.params.id, (err, deletedPark) => {
    //     if (err) {
    //         console.log(`error in parks#destroy: ${err}`)
    //         res.send(`park destroy error`)
    //     } else {
    //         res.send(`park deleted successfully`)
    //     }
    // })
    const parkToDelete = await db.Park.findById(req.params.id)
    const userUpdateObject = { $pull: {parks: parkToDelete._id}}
    const foundUser = await db.User.findByIdAndUpdate(parkToDelete.user, userUpdateObject, {new: true})
    parkToDelete.screenshots.forEach(async (screenshotId) => {
        let foundScreenshot = await db.Screenshot.findByIdAndUpdate(screenshotId, {park: null}, {new: true})
    })
    await db.Park.findByIdAndDelete(req.params.id)
    res.send(`park deleted successfully`)
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