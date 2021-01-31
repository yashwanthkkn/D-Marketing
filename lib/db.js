// require('dotenv').config()
const mongoose = require('mongoose');
let conn = null;
if(!conn){
    try{
        mongoose.connect("mongodb://localhost:27017/devdb",{
            useUnifiedTopology: true,
            useNewUrlParser:true
        });
        conn = mongoose.connection;
    }catch(err){
        console.log(err);
    }
}


module.exports = conn

