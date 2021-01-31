require('dotenv').config()
global.fetch = require('node-fetch');
global.navigator = () => null;


const User = require('../../models/user')
const { v4: uuidv4 } = require('uuid');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: process.env.POOL_ID,
   ClientId: process.env.APP_ID,
};
const pool_region = "ap-south-1";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.isLoggedIn = (req,res,next)=>{
    if (req.user && req.user.claim == "user") {
        if(req.user.emailVerified){
            next()
        }else{
            res.redirect('/verifyEmail')
        }
        
    } else {
        res.redirect('/login');
    }
}

module.exports.Signup = (data,callback)=>{
    var username = data.username;
    var password = data.password;
    if(username && password && password.length >=6){
        User.register(new User({
            username:username,
            email:username,
            claim:"user",
            joined:Date.now()+19800000,
            uuid:uuidv4(), 
            emailVerified:false
            ,name:emailToName.process(username)
        
        }),password,(err,user)=>{
            if(err){
                callback(err)
            }else{
                var attributeList = [];
                attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: username }));
                userPool.signUp(user.uuid, password, attributeList, null,(err,cuser)=>{
                    if(err){
                        callback(err)
                    }else{
                        callback(null,user)
                    }
                })             
                
            }
        })
    }else{
        callback({message:"Insufficient Data"})
    }
}

module.exports.changePassword = (data,callback)=>{
    var uuid = data.uuid;
    var cPassword = data.cPassword;
    var nPassword = data.nPassword;
    if(cPassword && nPassword){
        User.findOne({uuid:uuid},(err,user)=>{
            if(err || !user){
                callback(err,null)
            }else{
                user.changePassword(cPassword,nPassword,(err)=>{
                    if(err){
                        callback(err)
                    }else{
                        var userData = {
                            Username: uuid,
                            Pool: userPool,
                         };
                         var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                        cognitoUser.changePassword(cPassword, nPassword, function(err, result) {
                            //pass
                        });
                        callback(null,user)
                    }
                })
            }
        })
    }else{
        callback('infs')
    }
}

module.exports.verifyEmailCode = (data,callback)=>{
    var username = data.uuid;
    var uuid = data.uuid;
    var code = data.code;
    if(username && uuid && code){
        User.findOne({uuid:uuid},(err,user)=>{
            var userData = {
                Username: username,
                Pool: userPool,
             };
             
             var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
             cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    callback(err)
                }else{
                    user.emailVerified = true;
                    user.save(err=>{
                        if(err){
                            callback(err)                           
                        }else{
                            callback(null,result)
                        }
                    })
                }
             });
        })
    }else{
        callback('infs')
    }
}

module.exports.resendVerificationCode = (data,callback)=>{
    var username = data.uuid;
    var userData = {
        Username: username,
        Pool: userPool,
     };
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
           callback(err)
        }else{
            callback(null,result)
        }
        
    });
}

module.exports.forgotPassword = (data,callback)=>{
    var username = data.uuid;
    var userData = {
        Username: username,
        Pool: userPool,
     };   
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
     cognitoUser.forgotPassword({
         onSuccess:()=>{
             callback(null,"ok")
            },
         onFailure:(err)=>{
             callback(err)
         }
     })
}

module.exports.confirmPassword = (data,callback)=>{
    var user = data.user;
    var code = data.code;
    var password = data.password;
    var uuid = data.user.uuid;
    var userData = {
        Username: uuid,
        Pool: userPool,
     };   
             
     var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
     cognitoUser.confirmPassword(code,password,{
         onSuccess:()=>{
            user.setPassword(password,(err,user)=>{
                if(user){
                    user.save(()=>{
                        callback(null,'ok')
                    })
                }else{
                    callback(err)
                }
            })
         },
         onFailure:(err)=>{
            callback(err)
         }
     })
}

module.exports.Signup = (data,callback)=>{
    //  expects username (email), password
    var username = data.username;
    var password = data.password;
    if(username && password && password.length >=6){
        User.register(new User({
            username:username,
            email:username,
            claim:"user",
            joined:Date.now()+19800000,
            uuid:uuidv4(), 
            emailVerified:false
        }),password,(err,user)=>{
            if(err){
                callback(err)
            }else{
                var attributeList = [];
                attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: username }));
                userPool.signUp(user.uuid, password, attributeList, null,(err,cuser)=>{
                    if(err){
                        callback(err)
                    }else{
                        callback(null,user)
                    }
                })             
                
            }
        })
    }else{
        callback("Insufficient Data")
    }
}

module.exports.changePassword = (data,callback)=>{
    // expects uuid, Current Password, New Password
    var uuid = data.uuid;
    var cPassword = data.cPassword;
    var nPassword = data.nPassword;
    if(cPassword && nPassword){
        User.findOne({uuid:uuid},(err,user)=>{
            if(err || !user){
                callback(err,null)
            }else{
                user.changePassword(cPassword,nPassword,(err)=>{
                    if(err){
                        callback(err)
                    }else{
                        var userData = {
                            Username: uuid,
                            Pool: userPool,
                         };
                         var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                        cognitoUser.changePassword(cPassword, nPassword, function(err, result) {
                            //pass
                        });
                        callback(null,user)
                    }
                })
            }
        })
    }else{
        callback('Insufficient Data')
    }
}

module.exports.verifyEmailCode = (data,callback)=>{
    // expects uuid verification_code

    var username = data.uuid;
    var uuid = data.uuid;
    var code = data.code;
    if(username && uuid && code){
        User.findOne({uuid:uuid},(err,user)=>{
            var userData = {
                Username: username,
                Pool: userPool,
             };
             
             var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
             cognitoUser.confirmRegistration(code, true, function(err, result) {
                if (err) {
                    callback(err)
                }else{
                    user.emailVerified = true;
                    user.save(err=>{
                        if(err){
                            callback(err)                           
                        }else{
                            callback(null,result)
                        }
                    })
                }
             });
        })
    }else{
        callback('Insufficient Data')
    }
}

module.exports.resendVerificationCode = (data,callback)=>{
    // expects uuid 
    var username = data.uuid;
    var userData = {
        Username: username,
        Pool: userPool,
     };
     if(username){
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
               callback(err)
            }else{
                callback(null,result)
            }
            
        });
     }else{
         callback("Insufficent Data")
     }
}

module.exports.forgotPassword = (data,callback)=>{
    // expects uuid
    var username = data.uuid;
    var userData = {
        Username: username,
        Pool: userPool,
     };   
     if(username){
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.forgotPassword({
            onSuccess:()=>{
                callback(null,"ok")
               },
            onFailure:(err)=>{
                callback(err)
            }
        })
     }else{
        callback('Insufficient Data')
     }
     
}

module.exports.confirmPassword = (data,callback)=>{
    // expects user code
    var user = data.user;
    var code = data.code;
    var password = data.password;
    var uuid = data.user.uuid;
    var userData = {
        Username: uuid,
        Pool: userPool,
     };   
     if(user && code){
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmPassword(code,password,{
            onSuccess:()=>{
               user.setPassword(password,(err,user)=>{
                   if(user){
                       user.save(()=>{
                           callback(null,'ok')
                       })
                   }else{
                       callback(err)
                   }
               })
            },
            onFailure:(err)=>{
               callback(err)
            }
        })
     }else{
        callback('Insuffcient Data')
     }          
     
}