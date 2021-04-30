const User = require('../../models/user');

module.exports.addName = (data,callback)=>{
    var name = data.name;
    var uuid = data.uuid;
    User.findOne({name:name},(err,user)=>{
        if(err){
            callback(err);
        }else if(user){
            callback("exists")
        }else{
            User.findOne({uuid:uuid},(err,newuser)=>{
                if(err){
                    callback(err)
                }else{
                    newuser.name = name;
                    newuser.save(()=>{
                        callback(null,newuser)
                    })
                }
            })
        }

    })
}

module.exports.getUser = (data,callback)=>{
    var userid = data.userid;
    User.findOne({uuid:userid},(err,user)=>{
        if(err || !user){
            callback('no user');
        }else{
            callback(null,user);
        }
    })
}

module.exports.getUserByEmail = (data,callback)=>{
    var email = data.email;
    User.findOne({email:email},(err,user)=>{
        if(err || !user){
            callback('no user');
        }else{
            callback(null,user);
        }
    })
}

module.exports.setPreference = (data,callback)=>{
    var uuid = data.uuid;
    var preference = data.preference;
    User.findOne({uuid:uuid},(err,user)=>{
        if(err){
            callback(err);
        }else if(!user){
            callback("No such User")
        }else{
            user.preference = preference;
            user.save((err)=>{
                if(err){
                    callback(err);
                }else{
                    callback(null,user);
                }
            })
        }
    })
}



module.exports.updatePaymentInfo = (data,callback)=>{
    var uuid = data.uuid;
    var number = data.payment_number;
    var type = data.payment_type;
    if(uuid && number && type && number.length==10){
        User.findOne({uuid:uuid},(err,user)=>{
            if(err){
                callback(err);
            }else{
                user.payment_number = number;
                user.payment_type = type;
                user.payment_info = true;
                user.save(()=>{
                    callback(null,user);
                })                
            }
        })
    }else{
        callback("Insufficeint data");
    }
}