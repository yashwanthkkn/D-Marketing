const router = require('express').Router();
const User = require('./user.function')

router.get('/home',(req,res)=>{
    res.render('home',{highlight:1})
})

router.get('/profile',(req,res)=>{
    if(req.user.preference == "page"){
        res.redirect('/p/profile');
    }else{
        res.redirect('/b/profile');
    }
    
})



router.get('/payment',(req,res)=>{
    res.render('paymentList',{highlight:0})
})



router.get('/view',(req,res)=>{
    res.render('view',{highlight:1})
})
module.exports = router