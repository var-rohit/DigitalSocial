const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new stratergy for google login
passport.use(new googleStratergy({
        clientID : "595573587800-p7cqbjn0phglg7tsgj5gqs7pe2eod4df.apps.googleusercontent.com",
        clientSecret : "1-Jsddz_jp5kYbmP_73SzIvB",
        callbackURL : "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken,refreshToken,profile,done){
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log("error in google stratergy-passport ",err);
                    return;
                }
                console.log(accessToken,refreshToken);
                console.log(profile);

                if(user){
                    //if found , set this user as req.user
                    return done(null,user);
                }
                else{
                    //if not found,create a user and set it as req.user
                    User.create({
                        fname : profile.displayName,
                        email: profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log("error in creating user using google stratergy-passport ",err);
                            return;
                        }

                        return done(null,user);
             
                    })
                }
        })
    }




));

module.exports = passport;
