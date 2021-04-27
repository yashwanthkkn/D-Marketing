const router = require('express').Router();
const page = require('./page.function')

router.get('/profile',(req,res)=>{
    var uuid = req.user.uuid;
    page.getPageById({uuid:uuid},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.render("profile_page",{page:result})
        }
    })
})

router.get('/profile/edit/pageinfo',(req,res)=>{
    res.render('profile_edit',{type:"page_info"});
})

router.post('/pageinfo',(req,res)=>{
    var uuid = req.user.uuid;
    req.body.uuid = uuid;
    page.getPageById(req.body,(err,result)=>{
        if(err && result==null){
            console.log(err);
            res.redirect('/user/home')
        }else{
            page.updatePageInfo(req.body,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/p/profile");
                }
            })
        }
    })
})
router.get('/list',(req,res)=>{
    res.render('offerList',{highlight:3})
})

router.get('/add/view',(req,res)=>{
    res.render('viewAddPage',{highlight:0})
})
module.exports = router;