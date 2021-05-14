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
    type:String

});

// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("Add",Schema);