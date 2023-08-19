const nodemailer = require('../config/nodemailer');

exports.forgotPassword = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:'rohitkatare559@gmail.com',
        to: comment.user.email,
        subject:"New comment is published",
        html:htmlString
        // html:'<h1>new comment created</h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return ;
        }
        console.log("message sent",info);
        return;
    });
}