const router = require('express').Router();


router.get('/profile',(req,res)=>{
    res.render("profile_brand")
})

router.get('/list',(req,res)=>{
    res.render('addlist',{highlight:2})
})

router.get('/add/create',(req,res)=>{
    res.render('create',{highlight:0})
})

router.get('/add/view',(req,res)=>{
    res.render('viewAdd',{highlight:0})
})

module.exports = router