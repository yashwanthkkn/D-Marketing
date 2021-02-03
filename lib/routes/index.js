const express = require('express')
const router = express.Router()
const test = require('./test/test.controller')
const auth = require('./auth/auth.controller')
const user = require('./user/user.controller')
const Auth = require('./auth/auth.function')
router.use('/test',test)
router.use('/',auth)
router.use('/user',Auth.isLoggedIn,user)
// Add more routes here
module.exports = router