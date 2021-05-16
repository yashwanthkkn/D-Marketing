var CryptoJS = require("crypto-js");

module.exports.getHash = (data,secret)=>{
    if(data && secret){
        return CryptoJS.HmacSHA256(data,secret);
    }else{
        return null;
    }
}