const passport = require('passport');

const JWTStratergy = require('passport-jwt').Strategy;

//will help in extracting JWT from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;

//As we will require it to compare credentials from database
const User = require('../models/user');
const env = require('./environment');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),  
    secretOrKey : env.google_client_secret
}

passport.use(new JWTStratergy(opts,function(jwtPayload,done){
  
        User.findById(jwtPayload._id,function(err,user){
            if(err){
                console.log(" Error in finding user from JWT");
                return;
            }

            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })


}));



module.exports = passport;
