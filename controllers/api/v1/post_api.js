const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index =async function(req,res){

    const posts =await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.json(200,{
        message:"Lists of posts",
        post:posts
    })
}
module.exports.destroy = async function(req,res){
    try{
        const post = await Post.findById(req.params.id);
        if(post.user.toString() == req.user.id){
            await post.deleteOne({_id:req.params.id});
            await Comment.deleteMany({post:req.params.id});
          
            return res.json(200,{
                message:"Post and associated comments deleted"
            });
        }else{
            return res.json(401,{
                message:"You cannot delete this post"
            });
        }
    }catch(err){
        console.log('******',err);
        return res.json(500,{
            message:"Internal server error"
        });
    }  
}