const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');



module.exports.create = async function(req,res){
   let post = await Post.findById(req.body.post);

        if(post)
        {
          let comment =  await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });
            
            
                //adding comment to post,updating post schema
                 post.comments.push(comment);
                 post.save();

                let username = await User.find({_id : req.user._id},{fname : 1,_id:0});

                //to check that req is ajax request,so it should be xml http req(xhr)
                if(req.xhr)
                {
                    console.log(comment._id);
                    
                    return res.status(200).json({
                        data: {
                            comment : comment,
                            username : username[0]
                        },
                        message : "Comment created !"
                    });
                }
                
                req.flash('success',"Comment published!");

                res.redirect('/');
        }
        else
        {
            req.flash('error',"Post not found!");

            res.redirect('back');
        }
    
}


module.exports.destroy =async function(req,res){
    

    try {
        let comment = await Comment.findById(req.params.id);
    
        if(comment.user == req.user.id){
    
                let postId = comment.post;
                comment.remove();
    
                await Post.findByIdAndUpdate(postId,{$pull : {comments :  req.params.id}});
                req.flash('success',"Comment deleted!");

                return res.redirect('back');
                
            }
            else
                {
                    req.flash('error',"You cannot delete it!");

                    return res.redirect('back');
                         
                }
     
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
                 

    }
    
       
}