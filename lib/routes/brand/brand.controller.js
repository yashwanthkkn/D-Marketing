const router = require('express').Router();
const Brand = require('./brand.function')
const Page = require("../page/page.function")
const Upload = require('../upload/upload.function')
const Moment = require('moment')
router.get('/profile',(req,res)=>{
    var data = {
        uuid:req.user.uuid
    }
    Brand.getBrandById(data,(err,brand)=>{
        if(err){
            console.log(err);
        }else{
            res.render("profile_brand",{brand:brand,user:req.user})
        }
    })
})

router.get('/profile/edit/brandinfo',(req,res)=>{
    res.render('profile_edit',{type:"brand_info"});
})

router.get('/profile/edit/paymentinfo',(req,res)=>{
    res.render('profile_edit',{type:"payment_info"});
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

router.post('/profile/paymentinfo',(req,res)=>{
    var uuid = req.user.uuid;
    req.body.uuid = uuid;
    Brand.updatePaymentInfo(req.body,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("/b/profile/edit/paymentinfo");
        }else{
            res.redirect("/b/profile");
        }
    })
})

router.get('/list',(req,res)=>{
    var data = {
        uuid:req.user.uuid
    };
    Brand.getAdds(data,(err,adds)=>{
        if(err){
            res.redirect("/user/home");
        }else{
            Brand.getBrandById({uuid:req.user.uuid},(err,brand)=>{
                res.render('add_list',{highlight:2,adds:adds,brand:brand,Moment:Moment})
            })
        }
    })
})

router.get('/add/create',(req,res)=>{
    res.render('create',{highlight:0})
})

router.get('/add/view/:uuid',(req,res)=>{
    var data = {
        uuid:req.params.uuid
    }
    Brand.getAddById(data,(err,add)=>{
        if(err){
            console.log(err);
            res.redirect('/b/list')
        }else{
            Brand.getCartById(data,(err,pages)=>{
                if(err){
                    console.log(err);
                    res.redirect("/b/list");
                }else{
                    res.render('viewAdd',{highlight:0,add:add,Moment:Moment,pages:pages})
                }
            })
        }
    })
})

router.post("/add/new",Upload.upload.single('poster'),(req,res)=>{
    if(req.file_error){
        console.log(req.file_error);
        res.redirect("/b/add/create");
    }else{
        var data = req.body;
        data.file = req.file;
        data.owner = req.user.uuid;
        data.dp_url = req.user.dp_url;
        Brand.createAdd(data,(err,result)=>{
            if(err){
                console.log(err);
                res.redirect("/b/add/create")
            }else{
                res.redirect("/b/list")
            }
            
        })
    }
})

router.post("/add/:page_uuid/campaign",(req,res)=>{
    var str = req.body.choice;
    var arr = str.split(' ');
    var data = {}
    data.uuid = req.user.uuid;
    data.page_uuid = req.params.page_uuid;
    data.price = arr[0];
    data.type = arr[1];
    data.add_uuid = req.body.add;
    Page.getPageById({uuid:data.page_uuid},(err,page)=>{
        if(err){
            console.log(err);
            res.redirect('/user/home')
        }else{
            data.page_name = page.page_name;
            data.page_dp_url = page.page_dp_url;
            Brand.addToCart(data,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    Brand.incAddCount({uuid:data.add_uuid},(err,add)=>{
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/b/add/view/"+data.add_uuid)
                        }
                    })
                }
            })
        }
    })
    
})

module.exports = router