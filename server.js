//require
const express = require('express')
const app = express()
const PORT = /*process.env.PORT ||*/ 4000

//middleware

//connection
app.listen(PORT, () => console.log(`listening on port ${PORT}`))