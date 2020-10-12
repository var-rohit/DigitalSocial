const User = require('../models/user');
const fs = require('fs');
const path = require('path');  

module.exports.profile = async function(req,res){
    
    try {

        let user = await User.findById(req.params.id);

        return res.render('user_profile',{
            title : "Profile",
            profile_user : user
        });
        5
        
    } catch (error) {
        console.log('Error',error);
    }
    
    
}

module.exports.update = async function(req,res){
   
    try {

        if(req.user.id == req.params.id)
        {
            
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    req.flash('multer error',error);
                    return res.redirect('back');
                }

                user.fname = req.body.fname;
                user.lname = req.body.lname;
                user.email = req.body.email;
                
                //this is saving the path of the uploaded file into the avatar field of the User schema
                if(req.file){

                    if(user.avatar){
                        fs.unlink(path.join(__dirname,'..',user.avatar),function(err){
                            if(err){
                                console.log("file not present");
                            }
                        });
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                req.flash('success',"Details updated!");
                return res.redirect('back');
          
               
            })
        
        }
        else{
            req.flash('error','Unauthorized');
            res.status(401).send('Unauthorized');
            return;
        }
        
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
       
    }
   
  
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/');
    }
    
    return res.render('sign_up.ejs',{
        title : "Sign Up"
    });
}


module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
   
    
    return res.render('sign_in.ejs',{
        title : "Sign In"
    });
}

module.exports.resetPwdView = function(req,res){
   
   
    
    return res.render('reset_password.ejs',{
        title : "Reset Password"
    });
}


//sign-up
module.exports.create =async function(req,res){

    try {
        
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

   let user = await User.findOne({ email : req.body.email});
      
   if(!user)
            {
                await User.create(req.body);
                    return res.redirect('/users/sign-in');        
            }
            else
            {
                return res.redirect('back');
            }
   

    } catch (error) {
        console.log('Error',error);
    }  


}

module.exports.resetPwd = async function(req,res){
    try {
        
        let user = await User.findOne({email : req.body.email});
        console.log(req.body.email);

        if(user)
        {
            req.flash('success',"Password reset link sent !");
            return res.redirect('back');
        }
        else{
            req.flash('error',"Email not found");
            return res.redirect('back');
        }


    } catch (error) {
        console.log('Error',error);
    }
}

module.exports.createSession = function(req,res){
        req.flash('success',"Logged in Successfully");
        return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.flash('success',"Logged out Successfully");
      
    req.logout();

    return res.redirect('/');
}