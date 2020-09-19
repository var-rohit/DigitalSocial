const User = require('../models/user');

module.exports.profile = function(req,res){
   
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){

            if(err){console.log('Error in finding User'); return ;}


            if(user){
                return res.render('user_profile',{
                    title : "User profile",
                    user : user
                });
            }
            else{
               return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }

}


module.exports.signUp = function(req,res){
    return res.render('sign_up.ejs',{
        title : "Sign Up"
    });
}


module.exports.signIn = function(req,res){
    return res.render('sign_in.ejs',{
        title : "Sign In"
    });
}

module.exports.signOut = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');

}


//get the sign-up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({ email : req.body.email} , function (err,user){

        if(err){console.log('Error in finding User'); return ;}

        if(!user)
            {
                User.create(req.body,function(err,user){
                    if(err){console.log('Error in creating User'); return ;}

                    return res.redirect('/users/sign-in');        
                })
            }
            else
            {
                return res.redirect('back');
            }
    });

}

module.exports.createSession = function(req,res){
        
    User.findOne({email : req.body.email }, function(err,user){
        if(err){console.log('Error in finding User'); return ;}

         if(user)
         {
            if(user.password != req.body.password)
            {
                return res.redirect('back');
        
            }

            res.cookie('user_id',user.id);
            return res.redirect ('/users/profile');
         }
         else
         {
            return res.redirect('back');
         }   
    });

}