const router = require('express').Router();

router.get('/home',(req,res)=>{
    res.render('home')
})

router.get('/profile',(req,res)=>{
    var type = req.query.ty;
    if(type){
        if(type == 'p'){
            res.render('profile',{type:'p'})
        }else if(type == 'b'){
            res.render('profile',{type:'b'})
        }else{
            res.render('/user/home')    
        }     
    }else{
        res.render('/user/home')
    }
})

router.get('/profile/b',(req,res)=>{
    res.render('brand_profile')
})

module.exports = router