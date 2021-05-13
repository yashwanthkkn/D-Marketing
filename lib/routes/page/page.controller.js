const router = require('express').Router();
const Page = require('./page.function')

router.get('/profile',(req,res)=>{
    var uuid = req.user.uuid;
    Page.getPageById({uuid:uuid},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.render("profile_page",{page:result,user:req.user})
        }
    })
})

router.get('/profile/edit/pageinfo',(req,res)=>{
    res.render('profile_edit',{type:"page_info"});
})

router.get('/profile/edit/paymentinfo',(req,res)=>{
    res.render('profile_edit',{type:"page_payment"});
})

router.post('/pageinfo',(req,res)=>{
    var uuid = req.user.uuid;
    req.body.uuid = uuid;
    Page.updatePageInfo(req.body,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("/p/profile/edit/pageinfo");
        }else{
            res.redirect("/p/profile");
        }
    })
})

router.post("/paymentinfo",(req,res)=>{
    var uuid = req.user.uuid;
    req.body.uuid = uuid;
    Page.updatePaymentInfo(req.body,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("/p/profile/edit/paymentinfo");
        }else{
            res.redirect("/p/profile");
        }
    })
})

router.post('/search',(req,res)=>{
    var data = {
        search:req.body.search
    }
    Page.searchPage(data,(err,pages)=>{
        if(err){
            console.log(err);
            res.redirect("/user/home");
        }else{
            res.render('page_list',{highlight:1,pages:pages,user:req.user})
        }
    })
})

router.get('/list',(req,res)=>{
    res.render('offerList',{highlight:3})
})

router.get('/view/:uuid',(req,res)=>{
    var uuid = req.params.uuid;
    Page.getPageById({uuid:uuid},(err,page)=>{
        if(err){
            console.log(err);
            res.redirect("/user/home")
        }else if(!page){
            res.redirect("/user/home");
        }else{
          res.render('page_view',{highlight:1,page:page})
        }
    })
})

router.get('/add/view',(req,res)=>{
    res.render('viewAddPage',{highlight:0})
})
module.exports = router;