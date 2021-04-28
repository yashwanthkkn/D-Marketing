const User = require('../../models/user')
const Brand = require('../../models/brand')

module.exports.createBrand = (data,callback)=>{
    var uuid = data.uuid;
    if(uuid){
        var brand = new Brand({
            uuid:uuid,
        })
        brand.save((err)=>{
            if(err){
                callback(err)
            }else{
                callback(null,brand);
            }
        })
    }else{
        callback("Insufficient data");
    }
}
