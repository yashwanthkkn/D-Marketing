var mongoose = require("mongoose");

// DEFINING THE SCHEMA
const Schema = new mongoose.Schema({

    uuid:String,
    page_info:Boolean,
    page_promo_info:Boolean,
    page_payment_info:Boolean,
    page_name:String,
    page_type:String,
    page_followers:Number,
    page_cat:[],
    page_story:Number,
    page_post:Number,
    page_both:Number,
    page_payment_type:String,
    page_payment_number:Number

});

// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Page",Schema);