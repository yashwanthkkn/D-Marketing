require('dotenv')
const razor = require('../../helpers/razor')
const Razorpay = require('razorpay')
const { v4: uuidv4 } = require('uuid');

const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});
module.exports.newOrder = (data,callback)=>{
    var totalPrice = data.totalPrice;
    if(totalPrice){
        const options = {
            amount: totalPrice * 100, 
            currency: "INR",
            receipt: uuidv4(),
            payment_capture: 1,
        };
            instance.orders.create(options, async function (err, order) {
              if (err) {
                  callback(err);
              }else{
                  order.kid = process.env.RAZOR_PAY_KEY_ID;
                  callback(null,order)
              }
            });    
            // return res.render('payment',{msg:null,order:order,id:razor.config.RAZOR_PAY_KEY_ID});
    }else{
        callback("Insufficinet data")
    }
}