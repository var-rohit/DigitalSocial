const nodeMailer = require('../config/nodemailer');

//another way to export

exports.resetPwd = (resetpwd) => {
    console.log("inside resetPassword mailer");
    let htmlString  = nodeMailer.renderedTemplate({resetpwd : resetpwd},'/password_reset/reset_pwd_template.ejs');  
    console.log(resetpwd.user.email);
    nodeMailer.transporter.sendMail({
        from : "developmentrohit07@gmail.com",
        to : resetpwd.user.email,
        subject : "Reset password",
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