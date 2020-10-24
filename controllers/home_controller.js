const Post = require('../models/post');
const User = require('../models/user');
const ResetPwd = require('../models/reset_pwd');



module.exports.home =async function(req,res){

    //console.log(req.cookies);

    try {

          //populate user of each post (this user is taken via post schema) , this is preloading users
   let posts = await Post.find({}).sort('-createdAt').populate('user')
   .populate({
       path : 'comments',
       options: { sort: { 'createdAt': 1 } },
       populate : {
           path : 'user likes'
           
       }
   }).populate('likes'); 

   //this won't start until and unless above written await gets completed    
   let users = await User.find({});


   return res.render('home',{
       title : "DigitalSocial",
       posts : posts,
       all_users : users
   });


        
    } catch (error) {
        console.log('Error',error);
    }
    
      
}

module.exports.resetPwd = async function(req,res){
    
    let resetLink = await ResetPwd.findOne({access_token : req.params.id,isValid : 'true'});

    if(!resetLink){
        req.flash('error',"Password reset link expired !");
        return res.redirect('back');
    }

    //console.log("reset link ",resetLink);

    return res.render('reset_password.ejs',{
        title : "Reset Password",
        resetpwd : resetLink

    });

}


