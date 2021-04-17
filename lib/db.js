// require('dotenv').config()
const mongoose = require('mongoose');
let conn = null;
if(!conn){
    try{
        mongoose.connect("mongodb+srv://hylet-user:j62SsrDJ99wRW6Mx@cluster0.f0akj.mongodb.net/hylet_prod_db?retryWrites=true&w=majority",{
            useUnifiedTopology: true,
            useNewUrlParser:true
        });
        conn = mongoose.connection;
    }catch(err){
        console.log(err);
    }
}


module.exports = conn

