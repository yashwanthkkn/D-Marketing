require('dotenv').config()
const mongoose = require('mongoose');
let conn = null;
if(!conn){
    try{
        mongoose.connect(process.env.DB,{
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useCreateIndex:true
        });
        conn = mongoose.connection;
    }catch(err){
        console.log(err);
    }
}


module.exports = conn

