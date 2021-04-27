const router = require('express').Router();


router.get('/home',(req,res)=>{
    res.render('home',{highlight:1})
})



router.get('/payment',(req,res)=>{
    res.render('paymentList',{highlight:0})
})

router.get('/list',(req,res)=>{
    res.render('list',{highlight:1})
})

router.get('/view',(req,res)=>{
    res.render('view',{highlight:1})
})
module.exports = router