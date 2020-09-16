//require
const db = require('../models')

//controllers
// index filter show create update destroy
//NOTE: probably not going to use this for anything
const index = (req, res) => {
    db.Comment.find({}, (err, foundComments) => {
        if (err) console.log(`error in Comments#index: ${err}`)
        //res.send('Comments index called!')
        res.status(200).json({comments: foundComments})
    })
}

//NOTE: should I display comments by Show or through one database call that filters by screenshot or park
const show = (req,res) => {
    db.Comment.findById(req.params.id, (err, foundComment) => {
        if (err) console.log(`error in Comments#show: ${err}`)
        //res.send(`Comment show called`)
        res.status(200).json({comment: foundComment})
    })
}

//for comments filtered by an array of IDs
const filter = (req,res) => {
    //const body = req.body
    const filterObject = {_id: {$in: req.body}}
    db.Comment.find(filterObject, (err, foundComments) => {
        if (err) console.log(`error in Comments#filter: ${err}`)
        res.status(200).json({comments: foundComments})
    })
}

//TODO: need to push to comments array for user it's by and park/screenshot it's on
const create = async (req, res) => {
    // db.Comment.create(req.body, (err,createdComment) => {
    //     if (err) console.log(`error in Comments#create: ${err}`)
    //     //res.send(`Comment create called`)
    //     res.status(200).json({comment: createdComment})
    // })
    const createdComment = await db.Comment.create(req.body)
    const updateObject = {$push: {comments: createdComment._id}}
    const foundUser = await db.User.findByIdAndUpdate(createdComment.user, updateObject, {new: true})
    //The case where it's a comment on a park
    if (createdComment.park) {
        const foundPark = await db.Park.findByIdAndUpdate(createdComment.park, updateObject, {new: true})
        res.status(200).json({comment: createdComment, user: foundUser, park: foundPark})
    } else {
        //The case where it's a comment on a screenshot
        const foundScreenshot = await db.Screenshot.findByIdAndUpdate(createdComment.screenshot, updateObject, {new: true})
        res.status(200).json({comment: createdComment, user: foundUser, screenshot: foundScreenshot})
    }
}

const update = (req, res) => {
    db.Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedComment) => {
        if (err) console.log(`error in Comments#update: ${err}`)
        //res.send(`Comment update called`)
        res.status(200).json({
            comment: updatedComment,
            //message: `${updatedComment.Commentname} updated succesfully`
        })
    })
}

//TODO: need to pull from comments array for user it's by and park/screenshot it's on
const destroy = async (req, res) => {
    // db.Comment.findByIdAndDelete(req.params.id, (err, deletedComment) => {
    //     if (err) {
    //         console.log(`error in Comments#destroy: ${err}`)
    //         res.send(`Comment destroy error`)
    //     } else {
    //         res.send(`Comment deleted successfully`)
    //     }
    // })
    const commentToDelete = await db.Comment.findById(req.params.id)
    const updateObject = {$pull: {comments: commentToDelete._id}}
    const foundUser = await db.User.findByIdAndUpdate(commentToDelete.user, updateObject, {new: true})
    const foundPark = await db.Park.findByIdAndUpdate(commentToDelete.park, updateObject, {new: true})
    const foundScreenshot = await db.Screenshot.findByIdAndUpdate(commentToDelete.screenshot, updateObject, {new: true})
    await db.Comment.findByIdAndDelete(req.params.id)
    res.status(200).json({deletedCommentId: commentToDelete._id, user: foundUser, screenshot: foundScreenshot, park: foundPark})
}

//export
// index filter show create update destroy
module.exports = {
    index,
    show,
    filter,
    create,
    update,
    destroy
}