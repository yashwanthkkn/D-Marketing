var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 


// DEFINING THE SCHEMA
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    joined:String,
    claim:String,
    emailVerified:false,
    uuid:String,
    isOnboardPage:Boolean,
    isOnboardBrand:Boolean,
    preference:String,
    payment_type:String,
    payment_number:Number,
    payment_info:Boolean,

    // dp
    dp_url:String,
    dp_key:String
});

UserSchema.plugin(passportLocalMongoose);
// EXPORTING THE MODULE OBJECT
module.exports = mongoose.model("User",UserSchema);