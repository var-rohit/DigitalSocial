const nodeMailer = require('../config/nodemailer');

//another way to export

exports.resetPassword = (comment) => {
    //console.log("inside newComment mailer");
    let htmlString  = nodeMailer.renderedTemplate({comment : comment},'/password_reset/reset_pwd_template.ejs');  

    nodeMailer.transporter.sendMail({
        from : "developmentrohit07@gmail.com",
        to : comment.user.email,
        subject : "New comment published",
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail ",err);
            return;
        }

        console.log("Mail delivered ",info);
        return;
    })
}