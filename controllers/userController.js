const User = require('../models/user');

module.exports.profile=async function(req,res){
    return res.render('user_profile',{
        title:"User Profile", 
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}
module.exports.signIn =async function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
   return res.render('user_sign_in',{
    title: "Codeial | Sign In"
    });
}
module.exports.create = async function(req,res){
    if(req.body.password !== req.body['confirm-password']){
        return res.redirect('back');
    }
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            await User.create(req.body);
            return res.redirect('/user/sign-in');
        }else{
             return res.redirect('back');
        }
    }catch(err){
        console.log("error",err);
        return ;
    }
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(){
        console.log('user logged out');
    });

    return res.redirect('/');
}