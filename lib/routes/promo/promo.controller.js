const router = require('express').Router();

router.get('/:username',(req,res)=>{
    res.render('promotions',{highlight:0})
})

module.exports = router;