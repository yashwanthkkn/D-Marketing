var mongoose = require("mongoose");

// DEFINING THE SCHEMA
const Schema = new mongoose.Schema({
    add_uuid:String,
    page_uuid:String,
    page_name:String,
    page_dp_url:String,
    price:Number,
    type:String,
    addedAt:String,
    state:Boolean,
    proof_url:String,
    proof_key:String,
    payment:Boolean
});

// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Cart",Schema);