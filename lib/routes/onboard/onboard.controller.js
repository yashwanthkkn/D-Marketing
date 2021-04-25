const router = require('express').Router();

router.get('/',(req,res)=>{
    if(req.user ){
        res.render("onboard");
    }else{
        res.redirect('/');
    }
})

module.exports = router