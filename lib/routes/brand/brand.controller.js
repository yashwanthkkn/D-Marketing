const router = require('express').Router();
const Brand = require('./brand.function')

router.get('/profile',(req,res)=>{
    var data = {
        uuid:req.user.uuid
    }
    Brand.getBrandById(data,(err,brand)=>{
        if(err){
            console.log(err);
        }else{
            res.render("profile_brand",{brand:brand})
        }
    })
})

router.get('/profile/edit/brandinfo',(req,res)=>{
    res.render('profile_edit',{type:"brand_info"});
})

router.post('/brandinfo',(req,res)=>{
    var uuid = req.user.uuid;
    req.body.uuid = uuid;
    Brand.updateBrandInfo(req.body,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("/b/profile/edit/brandinfo");
        }else{
            res.redirect("/b/profile");
        }
    })
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