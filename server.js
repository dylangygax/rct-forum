//require
const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = /*process.env.PORT ||*/ 4000
const cors = require('cors')//REMEMBER TO CONFIGURE THIS


//middleware
app.use(cors())//REMEMBER TO CONFIGURE THIS
app.use(express.json()) //JSON parsing

//routes
app.use('/api/v1/users', routes.users)
app.use('/api/v1/parks', routes.parks)
app.use('/api/v1/screenshots', routes.screenshots)
app.use('/api/v1/comments', routes.comments)
app.use('/api/v1/auth', routes.auth)

//connection
app.listen(PORT, () => console.log(`listening on port ${PORT}`))