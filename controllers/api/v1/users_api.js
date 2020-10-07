const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

        try{
            let user =await User.findOne({email : req.body.email});  

            if(!user || user.password != req.body.password){
                return res.json(401,{
                    message : "Invalid Username/Password!"
                });
            }

            return res.json(200,{
                message : "Sign in successful,here is your token , please keep it safe",
                data : { 
                    token : jwt.sign(user.toJSON(),'Digitalsocial',{expiresIn : '1000000000000000'})
                }
            })

        }catch(err){
            console.log(error);
        
        return res.json(500,{
            message : "Internal server error"
        });
        

        }
}
