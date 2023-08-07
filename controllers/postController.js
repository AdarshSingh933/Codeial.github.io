const Post = require('../models/post');

module.exports.create =async function(req,res){
    try{
        // if(req.isAuthenticated()){
            await Post.create({
                content:req.body.content,
                user:req.user._id
            });
            return res.redirect('/');
        // }
    }catch(err){
        console.log("error in finding Posts",err);
        return res.redirect('back');
    }
}