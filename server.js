require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
require('newrelic')
const userRoute = require('./routes/user')
const macrosRoute = require('./routes/macros')
const db = require('./db-config')

require('./bot.js')


if (process.env.DEV) {
  db.connect('test')
} else {
  db.connect('prod')
}

const app = express()

app.use(bodyParser.json())

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.use('/users', userRoute)

app.use('/macros', macrosRoute)

const port = process.env.PORT || 3000

app.listen(port)

console.log(`Server started on: ${port}`)
