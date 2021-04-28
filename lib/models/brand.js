var mongoose = require("mongoose");

// DEFINING THE SCHEMA
const Schema = new mongoose.Schema({
    uuid:String,
    brand_info:Boolean,
    brand_payment_info:Boolean,
    brand_name:String,
    brand_cat:[],
    brand_payment_type:String,
    brand_payment_number:Number

});

// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Brand",Schema);