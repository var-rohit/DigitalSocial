const passport = require('passport');


const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStratergy({
    usernameField :'email'
},

function(email,password,done){
        //find a user and establish the identity
        User.findOne({email : email},function(err,user){
            if(err){
                console.log(`Error in finding user----> passport`);
                return done(err); //this will report an error to passport
            }

            if(!user || user.password != password)
                {
                    console.log('Invalid Username/Password !');
                    return done(null,false);
                }

            return done(null,user);        

        });
   }

));


//serializing the user to decide which key to keep in cookies
passport.serializeUser(function(user,done){
            done(null,user.id); // storing user id as encrypted format in cookie  
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log(`Error in finding user----> passport`);
            return done(err);
        }

        return done(null,user);
    })
    
});

//check if user is already authenticated
//this function will be used as a middleware
passport.checkAuthentication = function(req,res,next){

    //if user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed-in
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the information of current signed in user from session cookie and we are
        //just sending to locals for the views
        res.locals.user = req.user;

    }


    next();
}


module.exports = passport;

