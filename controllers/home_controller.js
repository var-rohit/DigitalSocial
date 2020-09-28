const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = function(req,res){

    //console.log(req.cookies);
    
    //populate user of each post (this user is taken via post schema) , this is preloading users
    Post.find({}).populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){

        User.find({},function(err,users){

        return res.render('home',{
            title : "DigitalSocial",
            posts : posts,
            all_users : users
        });
        })

    
        });

    
}


