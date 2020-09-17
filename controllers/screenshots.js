//require
const db = require('../models')
// const multer = require('multer')

// //image upload
// const DIR = './public/'

// //stores a file in public to prepare for upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR)
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-')
//         cb(null, uuidv4() + '-' + fileName)
//     }
// })

// //
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true)
//         } else {
//             cb(null, false)
//             return cb(new Error('Image must be in .png, .jpg or .jpeg format.'))
//         }
//     }
// })










//controllers
//REQUIRED: title, image, user
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

//for screenshots filtered by an array of IDs
const filter = (req,res) => {
    const filterObject = {_id: {$in: req.body}}
    db.Screenshot.find(filterObject, (err, foundScreenshots) => {
        if (err) console.log(`error in Screenshots#filter: ${err}`)
        res.status(200).json({screenshots: foundScreenshots})
    })
}

const create = async (req, res) => {
    // db.Screenshot.create(req.body, (err,createdScreenshot) => {
    //     if (err) console.log(`error in Screenshots#create: ${err}`)
    //     //res.send(`Screenshot create called`)
    //     res.status(200).json({screenshot: createdScreenshot})
    // })
    const createdScreenshot = await db.Screenshot.create(req.body)
    const updateObject = { $push: {screenshots: createdScreenshot._id}}
    const foundUser = await db.User.findByIdAndUpdate(createdScreenshot.user, updateObject, {new: true})
    const foundPark = await db.Park.findByIdAndUpdate(createdScreenshot.park, updateObject, {new: true})
    res.status(200).json({screenshot: createdScreenshot, user: foundUser, park: foundPark})
}

//TO DO: should add to Park, if needed
const update = (req, res) => {
    db.Screenshot.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedScreenshot) => {
        if (err) console.log(`error in Screenshots#update: ${err}`)
        //res.send(`Screenshot update called`)
        res.status(200).json({
            screenshot: updatedScreenshot,
            //message: `${updatedScreenshot.title} updated succesfully`
        })
    })
}

//TO DO: delete all the screenshots's comments
const destroy = async (req, res) => {
    // db.Screenshot.findByIdAndDelete(req.params.id, (err, deletedScreenshot) => {
    //     if (err) {
    //         console.log(`error in Screenshots#destroy: ${err}`)
    //         res.send(`Screenshot destroy error`)
    //     } else {
    //         res.send(`Screenshot deleted successfully`)
    //     }
    // })
    const screenshotToDelete = await db.Screenshot.findById(req.params.id)
    const updateObject = { $pull: {screenshots: screenshotToDelete._id}}
    const foundUser = await db.User.findByIdAndUpdate(screenshotToDelete.user, updateObject, {new: true})
    const foundPark = await db.Park.findByIdAndUpdate(screenshotToDelete.park, updateObject, {new: true})
    screenshotToDelete.comments.forEach(async (commentId) => {
        await db.Comment.findByIdAndDelete(commentId)
    })
    //res.send(`Screenshot deleted successfully`)
    await db.Screenshot.findByIdAndDelete(screenshotToDelete._id)
    console.log({deletedScreenshotId: screenshotToDelete._id, user: foundUser, park: foundPark})
    res.status(200).json({deletedScreenshotId: screenshotToDelete._id, user: foundUser, park: foundPark})
}

//export
// index show create update destroy
module.exports = {
    index,
    show,
    filter,
    create,
    update,
    destroy
}