const Post = require('../models/post');


module.exports.home = function(req,res){

    //console.log(req.cookies);
    
    //populate user of each post
    Post.find({}).populate('user').exec(function(err,posts){

        return res.render('home',{
            title : "DigitalSocial",
            posts : posts
        });
    
        });

    
}


