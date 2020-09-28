const User = require('../models/user');

module.exports.profile = async function(req,res){
    
    try {

        let user = await User.findById(req.params.id);

        return res.render('user_profile',{
            title : "Profile",
            profile_user : user
        });
    
        
    } catch (error) {
        console.log('Error',error);
    }
    
    
}

module.exports.update = async function(req,res){
   
    try {

        if(req.user.id == req.params.id)
        {
            await User.findByIdAndUpdate(req.params.id,{
                fname : req.body.fname,
                lname : req.body.lname,
                email : req.body.email});
    
                return res.redirect('back');
            
        }
        else{
            res.status(401).send('Unauthorized');
            return;
        }
        
    } catch (error) {
        console.log('Error',error);
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

module.exports.createSession = function(req,res){
        return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}