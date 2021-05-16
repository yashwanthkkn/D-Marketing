require('dotenv')
const router = require('express').Router()
const Payment = require('./payment.function')
const Brand = require('../brand/brand.function')
const razor = require('../../helpers/razor')

router.get("/order/:add_uuid",(req,res)=>{
    var uuid = req.params.add_uuid;
    Brand.getAddById({uuid:uuid},(err,add)=>{
        if(err){
            console.log(err);
            res.redirect('/user/payment')
        }else{
            Payment.newOrder(add,(err,order)=>{
                if(err){
                    console.log(err);
                    res.redirect('/user/payment')
                }else{
                    res.render('rz',{order:order})
                }
            })
        }

    })    
})

router.post("/result/:oid",(req,res)=>{
    var oid = req.params.oid;
    var rz_payment_id = req.body.razorpay_payment_id;
    var rz_order_id = req.body.razorpay_order_id;
    var rz_sign = req.body.razorpay_signature;
    if(rz_payment_id && rz_order_id && rz_sign){
      var data = `${oid}|${rz_payment_id}`
      var hash = razor.getHash(data,process.env.RAZOR_PAY_KEY_SECRET)
      if(rz_sign == hash){
          res.render("payment_result",{result:true})
      }else{
        res.render("payment_result",{result:false})
      }
    }else{
        res.render("payment_result",{result:false})
    }
})
module.exports = router