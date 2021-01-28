const express = require('express')
const router = express.Router()
const test = require('./test/test.controller')

router.use('/test',test)
// Add more routes here
module.exports = router