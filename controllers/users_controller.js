const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){

    return res.render('user_profile',{
        title : "Profile",
        profile_user : user
    });
    })
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,{
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email},

            function (err,user) {
                return res.redirect('back');
            }
        );
    }
    else{
        res.status(401).send('Unauthorized');
        return;
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


//sign-up
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
    })

}

module.exports.createSession = function(req,res){
        return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}