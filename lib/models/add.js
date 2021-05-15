var mongoose = require("mongoose");

// DEFINING THE SCHEMA
const Schema = new mongoose.Schema({
    uuid:String,
    owner:String,
    name:String,
    caption:String,
    weblink:String,
    poster_link:String,
    poster_key:String,
    type:String,
    createdAt:String,
    dp_url:String,
    page_count:Number,
    promote_count:Number,
    payment:Boolean
});

// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Add",Schema);