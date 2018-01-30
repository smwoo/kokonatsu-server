const express = require('express')
const {
  previewRoute,
  newRoute,
  allRoute,
  macroRoute,
} = require('../controllers/macros')


const router = express.Router()


router.post('/preview', previewRoute)

router.post('/new', newRoute)

router.get('/all', allRoute)

router.get('/macro/:name', macroRoute)

module.exports = router
