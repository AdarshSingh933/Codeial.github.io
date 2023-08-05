const User = require('../models/user');

module.exports.profile= function(req,res){
    return res.render('user_profile',{
        title:'Profile'
    });
}
// module.exports.signUp =async function(req,res){
//     try{
//           await User.create({
//             email:req.body.email,
//             password:req.body.password,
//             name:req.body.name
//           });
//     }catch(err){
//         console.log("error",err);
//     }
//     return res.redirect('/signIn');
// }
// module.exports.singIn =async function(req,res){
//     const email = req.body.email;
//     const password = req.body.password;
//     const user = User.find({email,password});
//     if(user){
//         return res.redirect('/profile');
//     }else{
//         return ;
//     } 
// }
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}
module.exports.signIn = function(req,res){
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