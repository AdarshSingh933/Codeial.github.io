const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post' 
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;
