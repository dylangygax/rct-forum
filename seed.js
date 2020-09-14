const db = require('./models')
const data = require('./seedData.json')

const seed = async () => {
    await db.User.deleteMany({})
    await db.Park.deleteMany({})
    await db.Screenshot.deleteMany({})
    await db.Comment.deleteMany({})
    const createdUsers = db.User.create(data.users)
    const createdParks = db.Park.create(data.users)
    const createdScreenshots = db.Screenshot.create(data.users)
    const createdComments = db.Comment.create(data.users)
    console.log({users: createdUsers, parks: createdParks, screenshots: createdScreenshots, comments: createdComments})
    process.exit()
}

seed()