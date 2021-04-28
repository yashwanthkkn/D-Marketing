const router = require('express').Router();
const User = require("../user/user.function");
router.get('/',(req,res)=>{
    if(req.user ){
        res.render("onboard");
    }else{
        res.redirect('/');
    }
})

router.get('/preference/:type',(req,res)=>{
    
    if(req.user && (req.params.type == "page" || req.params.type == "brand" )){
        var uuid = req.user.uuid;
        var preference = req.params.type;
        var data = {
            uuid:uuid,
            preference:preference
        }
        User.setPreference(data,(err,result)=>{
            if(err){
                console.log(err);
                res.redirect("/user/home");
            }else{
                if(preference == "page"){
                    res.redirect("/p/profile/edit/pageinfo");
                }else{
                    res.redirect("/user/home");
                }
            }
        })
    }else{
        res.redirect('/');
    }
})


module.exports = router