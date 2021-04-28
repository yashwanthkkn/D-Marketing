const User = require('../../models/user')
const Brand = require('../../models/brand')

module.exports.getBrandById = (data,callback)=>{
    var uuid = data.uuid;
    Brand.findOne({uuid:uuid},(err,brand)=>{
        if(err){
            callback(err)
        }else{
            callback(null,brand)
            
        }
    }) 
}
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


module.exports.updateBrandInfo = (data,callback)=>{
    var uuid = data.uuid;
    var name = data.brand_name;
    var cat = data.brand_cat;
     if(name && cat && uuid){
        Brand.findOne({uuid:uuid},(err,brand)=>{
            if(err){
                callback(err);
            }else{
                brand.brand_name = name;
                brand.brand_cat = cat;
                brand.brand_info = true;
                brand.save(()=>{
                    callback(null,brand);
                })                
            }
        })
    }else{
        callback("Insufficeint data");
    }
}