//require
const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = /*process.env.PORT ||*/ 4000

//middleware
app.use(express.json()) //JSON parsing

//routes
app.use('/api/v1/users', routes.users)
app.use('/api/v1/parks', routes.parks)
app.use('/api/v1/screenshots', routes.screenshots)

//connection
app.listen(PORT, () => console.log(`listening on port ${PORT}`))