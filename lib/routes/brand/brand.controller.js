const router = require('express').Router();

router.get('/list',(req,res)=>{
    res.render('addlist',{highlight:2})
})

router.get('/add/create',(req,res)=>{
    res.render('create',{highlight:0})
})

module.exports = router