const User = require('../../models/user')
const Brand = require('../../models/brand')
const Page = require('../../models/page')
const Add = require('../../models/add')
const { v4: uuidv4 } = require('uuid');
module.exports.createBrand = (data,callback)=>{
    // expects uuid
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


module.exports.getBrandById = (data,callback)=>{
    // expects uuid
    var uuid = data.uuid;
    Brand.findOne({uuid:uuid},(err,brand)=>{
        if(err){
            callback(err)
        }else{
            callback(null,brand)
            
        }
    }) 
}



module.exports.updateBrandInfo = (data,callback)=>{
    // uuid brand_name brand_cat
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

module.exports.updatePaymentInfo = (data,callback)=>{
    // uuid brand_payment_number brand_payment_type
    var uuid = data.uuid;
    var number = data.brand_payment_number;
    var type = data.brand_payment_type;
    if(uuid && number && type && number.length==10){
        Brand.findOne({uuid:uuid},(err,brand)=>{
            if(err){
                callback(err);
            }else{
                brand.brand_payment_number = number;
                brand.brand_payment_type = type;
                brand.brand_payment_info = true;
                brand.save(()=>{
                    Page.findOne({uuid:uuid},(err,page)=>{
                        if(err){
                            callback(err);
                        }else{
                            page.page_payment_number = number;
                            page.page_payment_type = type;
                            page.page_payment_info = true;
                            page.save(()=>{
                                callback(null,page);
                            })                
                        }
                    })
                })                
            }
        })
    }else{
        callback("Insufficeint data");
    }
}

module.exports.createAdd = (data,callback)=>{
    var name = data.name;
    var type = data.type;
    var weblink = data.weblink;
    var owner = data.owner;
    var caption = data.caption;
    var location = data.file.location;
    var key = data.file.key;
    if(name && type && weblink && owner && caption && location && key){
        var add = new Add({
            name:name,
            type:type,
            weblink:weblink,
            owner:owner,
            caption:caption,
            uuid:uuidv4(),
            poster_link:location,
            poster_key:key
        })
        add.save((err)=>{
            if(err){
                callback(err)
            }else{
                callback(null,add);
            }
        })
    }else{
        callback("Insufficient data");
    }
}