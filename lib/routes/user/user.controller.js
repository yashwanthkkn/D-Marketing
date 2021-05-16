const router = require('express').Router();
const User = require('./user.function')
const Brand = require('../brand/brand.function')
const Page = require('../page/page.function')
const Moment = require('moment')
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
    var data = {
        uuid:req.user.uuid,
    }
    Brand.getAddsWithoutPayment(data,(err,adds)=>{
        if(err){
            console.log(err);
            res.redirect('/user/home')
        }else{
            res.render('payment',{highlight:0,adds:adds,Moment:Moment})
        }
    })
})

router.get('/billing/:add_uuid',(req,res)=>{
    var uuid = req.params.add_uuid;
    Brand.getCartByIdWithNoPayment({uuid:uuid},(err,pages)=>{
        if(err){
            console.log(err);
            res.redirect("/user/payment");
        }else{
            if(pages.length == 0){
                res.redirect("/user/payment");
            }else{
                Brand.getAddById({uuid:uuid},(err,add)=>{
                    if(err){
                        console.log(err);
                        res.redirect("/user/payment")
                    }else{
                        res.render('billing',{highlight:0,pages:pages,Moment:Moment,add:add});
                    }
                })
            }
        }
    })
})



module.exports = router