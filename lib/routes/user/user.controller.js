const router = require('express').Router();

router.get('/home',(req,res)=>{
    res.render('home',{highlight:1})
})

router.get('/profile',(req,res)=>{
    var type = req.query.ty;
    if(type){
        if(type == 'p'){
            res.render('profile',{type:'p'})
        }else if(type == 'b'){
            res.render('profile',{type:'b'})
        }else{
            res.redirect('/user/home')    
        }     
    }else{
        res.redirect('/user/home')
    }
})

router.get('/list',(req,res)=>{
    res.render('list',{highlight:1})
})

router.get('/view',(req,res)=>{
    res.render('view',{highlight:1})
})
module.exports = router