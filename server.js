const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const userRoute = require('./routes/user')
const macrosRoute = require('./routes/macros')
const db = require('./db-config')


if (process.env.DEV) {
  db.connect('test')
} else {
  db.connect('prod')
}

const app = express()

app.use(bodyParser.json())

app.use('/users', userRoute)

app.use('/macros', macrosRoute)

const port = process.env.PORT || 3000

app.listen(port)

console.log(`Server started on: ${port}`)
