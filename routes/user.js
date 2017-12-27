const express = require('express')
const { bookmarksRoute, loginRoute } = require('../controllers/user')


const router = express.Router()


router.get('/bookmarks', bookmarksRoute)

router.post('/login', loginRoute)

module.exports = router
