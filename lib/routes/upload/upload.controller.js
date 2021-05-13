const router = require('express').Router();
const Upload = require('./upload.function');
const User = require("../user/user.function")
const Page = require("../page/page.function")
router.post("/dp",Upload.upload.single('dp'),(req,res)=>{
    if(req.file_error){
        res.redirect("/user/profile")
    }else{     
        var data = req.file;
        data.uuid = req.user.uuid;
        User.updateProfilePicture(data,(err,result)=>{
            if(err){
                console.log(err);
            }
            Page.updateProfilePicture(data,(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.redirect("/user/profile")
            })
        })
    }
})
module.exports = router;