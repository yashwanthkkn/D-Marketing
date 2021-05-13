const User = require('../../models/user')
const Page = require('../../models/page')
const Brand = require('../../models/brand')

module.exports.createPage = (data,callback)=>{
    // expects uuid
    var uuid = data.uuid;
    if(uuid){
        var page = new Page({
            uuid:uuid,
        })
        page.save((err)=>{
            if(err){
                callback(err)
            }else{
                callback(null,page);
            }
        })
    }else{
        callback("Insufficient data");
    }
}

module.exports.getPageById = (data,callback)=>{
    // expects uuid
    var uuid = data.uuid;
    Page.findOne({uuid:uuid},(err,page)=>{
        if(err){
            callback(err)
        }else{
            if(page){
                callback(null,page)
            }else{
                callback(null,null)
            }
        }
    }) 
}


module.exports.searchPage = (data,callback)=>{
    var search = data.search;
    if(search){
        Page.find({$text: {$search: search}},(err,pages)=>{
            if(err){
                callback(err);
            }else{
                callback(null,pages);
            }
        })
    }else{
        callback("Infficient Data")
    }
}


module.exports.updatePageInfo = (data,callback)=>{
    // expects lot
    var uuid = data.uuid;
    var name = data.page_name;
    var cat = data.page_cat;
    var type = data.page_type;
    var followers = data.page_followers;
    var story = data.page_story;
    var post = data.page_post;
    var both = data.page_both;
    if(name && cat && type && followers && uuid && story && post && both){
        Page.findOne({uuid:uuid},(err,page)=>{
            if(err){
                callback(err);
            }else{
                page.page_name = name;
                page.page_type = type;
                page.page_followers = followers;
                page.page_cat = cat;
                page.page_info = true;
                page.page_promo_info = true;
                page.page_post = post;
                page.page_story = story;
                page.page_both = both;
                page.save(()=>{
                    callback(null,page);
                })                
            }
        })
    }else{
        callback("Insufficeint data");
    }
}

module.exports.updateProfilePicture = (data,callback)=>{
    var location = data.location;
    var uuid = data.uuid;
    if(location){
        Page.findOne({uuid:uuid},(err,page)=>{
            if(err || !page){
                callback(err);
            }else{
                page.page_dp_url = location;
                page.save((err)=>{
                    if(err){
                        callback(err);
                    }else{
                        callback(null,page);
                    }
                })
            }
        })
    }else{
        callback("Insufficient Data");
    }
}

module.exports.updatePaymentInfo = (data,callback)=>{
    // expects uuid page_payment_number page_payment_type
    var uuid = data.uuid;
    var number = data.page_payment_number;
    var type = data.page_payment_type;
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