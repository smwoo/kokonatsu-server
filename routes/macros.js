const express = require('express')
const {
  previewRoute,
  newRoute,
  allRoute,
  macroRoute,
  deleteRoute,
} = require('../controllers/macros')


const router = express.Router()


router.post('/preview', previewRoute)

router.post('/new', newRoute)

router.get('/all', allRoute)

router.get('/:name', macroRoute)

router.delete('/:id', deleteRoute)

module.exports = router
