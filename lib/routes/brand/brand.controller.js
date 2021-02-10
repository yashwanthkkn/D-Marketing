const router = require('express').Router();

router.get('/list',(req,res)=>{
    res.render('addlist',{highlight:2})
})

module.exports = router