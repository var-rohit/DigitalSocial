const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err)
        {
            console.log("Error while finding post");
            return;
        }

        if(post)
        {
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            },function(err,comment){
                if(err)
                {
                    console.log("Error while updating post schema");
                    return;
                }
                //adding comment to post,updating post schema
                //taking post from comment schema
                post.comments.push(comment);
                post.save();  

                res.redirect('/');
            })
        }
    })
}