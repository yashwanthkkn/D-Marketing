const router = require('express').Router();

router.get('/:username',(req,res)=>{
    res.render('promotions')
})

module.exports = router;