const router = require('express').Router();


router.get('/list',(req,res)=>{
    res.render('offerList',{highlight:3})
})

router.get('/add/view',(req,res)=>{
    res.render('viewAddPage',{highlight:0})
})
module.exports = router;