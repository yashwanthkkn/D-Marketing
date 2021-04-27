const User = require('../../models/user')
const Page = require('../../models/page')

module.exports.getPageById = (data,callback)=>{
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

module.exports.createBrand = (data,callback)=>{
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

module.exports.updatePageInfo = (data,callback)=>{
    var uuid = data.uuid;
    var name = data.page_name;
    var cat = data.page_cat;
    var type = data.page_type;
    var followers = data.page_followers;
    if(name && cat && type && followers && uuid){
        Page.findOne({uuid:uuid},(err,page)=>{
            if(err){
                callback(err);
            }else{
                page.page_name = name;
                page.page_type = type;
                page.page_followers = followers;
                page.page_cat = cat;
                page.page_info = true;
                page.save(()=>{
                    callback(null,page);
                })                
            }
        })
    }else{
        callback("Insufficeint data");
    }
}