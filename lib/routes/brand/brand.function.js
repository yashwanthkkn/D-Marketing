const User = require('../../models/user')
const Brand = require('../../models/brand')
const Page = require('../../models/page')
const Add = require('../../models/add')
const Cart = require("../../models/cart")
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
    var dp_url = data.dp_url;
    if(name && type && owner && caption && location && key){
        var add = new Add({
            name:name,
            type:type,
            weblink:weblink,
            owner:owner,
            caption:caption,
            uuid:uuidv4(),
            poster_link:location,
            poster_key:key,
            createdAt:Date.now(),
            dp_url:dp_url,
            page_count:0,
            promote_count:0,
            payment:false,
            totalPrice:0
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

module.exports.getAdds = (data,callback)=>{
    var owner = data.uuid;
    if(owner){
        Add.find({owner:owner},(err,adds)=>{
            if(err){
                callback(err)
            }else{
                callback(null,adds)
            }
        })
    }else{
        callback("Insufficient")
    }
}

module.exports.getAddsWithoutPayment = (data,callback)=>{
    var owner = data.uuid;
    if(owner){
        Add.find({owner:owner,payment:false},(err,adds)=>{
            if(err){
                callback(err)
            }else{
                callback(null,adds)
            }
        })
    }else{
        callback("Insufficient")
    }
}

module.exports.addToCart = (data,callback)=>{
    var page_uuid = data.page_uuid;
    var page_name = data.page_name;
    var page_dp_url = data.page_dp_url;
    var brand_name = data.brand_name;
    var brand_dp_url = data.brand_dp_url;
    var add_uuid = data.add_uuid;
    var price = data.price;
    var type = data.type;

    if(page_uuid && page_name && page_dp_url && add_uuid && price && type && brand_dp_url && brand_name){
        var cart = new Cart({
            page_uuid:page_uuid,
            page_name:page_name,
            page_dp_url:page_dp_url,
            brand_name:brand_name,
            brand_dp_url:brand_dp_url,
            add_uuid:add_uuid,
            price:price,
            type:type,
            addedAt:Date.now(),
            state:false,
            payment:false,
        })
        cart.save((err)=>{
            if(err){
                callback(err)
            }else{
                Add.updateOne({uuid:add_uuid},{payment:false},(err,add)=>{
                    if(err){
                        callback(err)
                    }else{
                        callback(null,cart)
                    }
                })
            }
        })
    }else{
        callback("Insufficient data");
    }

}

module.exports.getAddById = (data,callback)=>{
    var uuid = data.uuid;
    if(uuid){
        Add.findOne({uuid:uuid},(err,add)=>{
            if(err){
                callback(err)
            }else{
                callback(null,add)
            }
        })
    }else{
        callback("Insufficient data")
    }
}

module.exports.getCartById = (data,callback)=>{
    var uuid = data.uuid;
    if(uuid){
        Cart.find({add_uuid:uuid},(err,items)=>{
            if(err){
                callback(err)
            }else{
                callback(null,items)
            }
        })
    }else{
        callback("Insufficient");
    }
}

module.exports.getCartByIdWithNoPayment = (data,callback)=>{
    var uuid = data.uuid;
    if(uuid){
        Cart.find({add_uuid:uuid,payment:false},(err,items)=>{
            if(err){
                callback(err)
            }else{
                callback(null,items)
            }
        })
    }else{
        callback("Insufficient");
    }
}


module.exports.updateAdd = (data,callback)=>{
    var uuid = data.uuid;
    var price = data.price;
    if(uuid){
        Add.findOne({uuid:uuid},(err,add)=>{
            if(err){
                callback(err)
            }else{
                add.page_count +=1;
                add.totalPrice+=price;
                add.save(()=>{
                    callback(null,add)
                })
            }
        })
    }else{
        callback("Insufficient data")
    }
}

module.exports.updatePaymentForAdd = (data,callback)=>{
    var uuid = data.add_uuid;
    if(uuid){
        Add.updateOne({uuid:uuid,payment:false},{payment:true},(err,add)=>{
            if(err){
                callback(err)
            }else{
                Cart.updateMany({add_uuid:uuid,payment:false},{payment:true},(err,pages)=>{
                    if(err){
                        console.log(err);
                    }else{
                        callback(null,pages);
                    }
                })
            }
        })
    }else{
        callback("insufficient data")
    }
}

module.exports.acceptOffer = (data,callback)=>{
    var add_uuid = data.add_uuid;
    var page_uuid = data.page_uuid;
    var proof_url = data.file.location;
    var proof_key = data.file.key;
    if(add_uuid && page_uuid && proof_key && proof_url){
        Cart.updateOne(
            {
                add_uuid:add_uuid,
                page_uuid:page_uuid
            },
            {
                state:true,
                proof_key:proof_key,
                proof_url:proof_url
            },
            (err,cart)=>{
                if(err){
                    callback(err)
                }else{
                    Add.findOne({uuid:add_uuid},(err,add)=>{
                        if(err){
                            callback(err)
                        }else{
                            add.promote_count+=1;
                            add.totalPrice = 0;
                            add.save(()=>{
                                callback(null,add)
                            })
                        }
                    })
                }
            }
        )
    }else{
        callback("Insufficient data")
    }
}