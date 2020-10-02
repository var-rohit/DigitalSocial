const Post = require('../models/post');
const User = require('../models/user');



module.exports.home =async function(req,res){

    //console.log(req.cookies);

    try {

          //populate user of each post (this user is taken via post schema) , this is preloading users
   let posts = await Post.find({}).sort('-createdAt').populate('user')
   .populate({
       path : 'comments',
       populate : {
           path : 'user'
       }
   }) ; 

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


