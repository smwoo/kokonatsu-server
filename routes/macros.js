const express = require('express')
const { previewRoute, newRoute, macrosRoute } = require('../controllers/macros')


const router = express.Router()


router.post('/preview', previewRoute)

router.post('/new', newRoute)

router.get('/all', macrosRoute)

module.exports = router
