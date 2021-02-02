const express = require('express')
const router = express.Router()
const test = require('./test/test.controller')
const auth = require('./auth/auth.controller')
const Auth = require('./auth/auth.function')
router.use('/test',test)
router.use('/',auth)
router.get('/user/home',Auth.isLoggedIn,(req,res)=>{
    res.render("home")
})
// Add more routes here
module.exports = router