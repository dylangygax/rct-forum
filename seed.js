const db = require('./models')
const data = require('./seedData.json')
const ctrl = require('./controllers')
const fetch = require('node-fetch')
const REACT_APP_API_URL = /*deployed url || */"http://localhost:4000/api/v1"

//imgur portfolio at https://imgur.com/a/hVlN8wR

const seed = async () => {
    await db.User.deleteMany({})
    await db.Park.deleteMany({})
    await db.Screenshot.deleteMany({})
    await db.Comment.deleteMany({})
    //Users: REQUIRED: username
    const userData = [
        {username: "Zarathustra"},
        {username: "DorkyDan"}
    ]
    const createdUsers = await db.User.create(userData)
    //Parks: REQUIRED: parkName, overviewPic, user
    const parkData = [
        {
            parkName: "ZDTs",
            overviewPic: "https://i.imgur.com/MXXUQlH.png",
            user: createdUsers[0]._id
        },
        {
            parkName: "Wrath of Bob",
            overviewPic: "https://i.imgur.com/apM9WUy.png",
            user: createdUsers[0]._id
        },
        {
            parkName: "Shoestring Caverns",
            overviewPic: "https://i.imgur.com/gFZ77sM.png",
            user: createdUsers[1]._id
        }
    ]
    //const createdParks = await db.Park.create(parkData)
    const createdParks = await Promise.all(parkData.map(async park => {
        return await fetch(`${REACT_APP_API_URL}/parks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(park)
        }).then(res => res.json()).then(res => res.park)
    }))
    //Screenshots: REQUIRED: title, image, user
    const screenshotData = [
        {
            title: "Haunted Mine Drop",
            image: "https://i.imgur.com/PG6elg8.png",
            user: createdUsers[1]._id,
            park: createdParks[2]._id
        },
        {
            title: "hahahaha what is this even??",
            image: "https://i.imgur.com/oGeafKZ.pngs",
            user: createdUsers[1]._id,
            park: createdParks[2]._id
        },
        {
            title: "River Boats Double Queue Line",
            image: "https://i.imgur.com/0EYFLvc.png",
            user: createdUsers[0]._id,
            park: createdParks[1]._id
        },
        {
            title: "This BOB goes backwards haha",
            image: "https://i.imgur.com/bsfUpMK.png",
            user: createdUsers[0]._id,
            park: createdParks[1]._id
        },
        {
            title: "cute drop tower",
            image: "https://i.imgur.com/Xy28lyn.png",
            user: createdUsers[0]._id,
            park: createdParks[1]._id
        },
        {
            title: "cute little rides",
            image: "https://i.imgur.com/Yi32R15.png",
            user: createdUsers[0]._id,
            park: createdParks[0]._id
        },
        {
            title: "Dinky Switchback",
            image: "https://www.nedesigns.com/uploads/screens/6447/6447.png",
            user: createdUsers[0]._id,
            park: createdParks[0]._id
        }
    ]
    const createdScreenshots = await Promise.all(screenshotData.map(async screenshot => {
        return await fetch(`${REACT_APP_API_URL}/screenshots`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(screenshot)
        }).then(res => res.json()).then(res => res.screenshot)
    }))
    //Comments: REQUIRED: user, body, (park OR screenshot)
    const commentData = [
        {
            user: createdUsers[0]._id,
            park: createdParks[2]._id,
            body: "kind of amateurish tbh... not my favorite..."
        },
        {
            user: createdUsers[0]._id,
            screenshot: createdScreenshots[1]._id,
            body: "looks terrible"
        },
        {
            user: createdUsers[0]._id,
            screenshot: createdScreenshots[0]._id,
            body: "ok this fun"
        },
        {
            user: createdUsers[1]._id,
            screenshot: createdScreenshots[1]._id,
            body: "wow, very rude"
        },
        {
            user: createdUsers[1]._id,
            screenshot: createdScreenshots[2]._id,
            body: "nice hack, love the atmosphere. buildings need work"
        },
        {
            user: createdUsers[1]._id,
            screenshot: createdScreenshots[3]._id,
            body: "wow very zany"
        },
        {
            user: createdUsers[0]._id,
            screenshot: createdScreenshots[3]._id,
            body: "thnx"
        },
    ]
    const createdComments = await Promise.all(commentData.map(async comment => {
        return await fetch(`${REACT_APP_API_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then(res => res.json()).then(res => res.comment)
    }))
    
    console.log({users: createdUsers, parks: createdParks, screenshots: createdScreenshots, comments: createdComments})
    process.exit()
}

seed()