const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');




module.exports.create = async function(req,res){
   let post = await Post.findById(req.body.post);

    console.log("post ",req.body.post);

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

                 comment = await comment.populate('user','fname email').execPopulate();
              

                let username = await User.find({_id : req.user._id},{fname : 1,_id:0});
                
                //this line should go in queue
//                commentsMailer.newComment(comment);
               let job =  queue.create('emails',comment).save(function(err){
                   if(err){
                       console.log("Error in sending job to queue");
                       return;
                   }

                   console.log('job enqueued ',job.id);
               })

                //to check that req is ajax request,so it should be xml http req(xhr)
                if(req.xhr)
                {
                    
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

                if(req.xhr){
                    // console.log(req.params.id);
 
                     return res.status(200).json({
                         data : {
                             comment_id : req.params.id
                             
                         },
                     
                         message: "Comment deleted!"
                     });
                 }
                 
 


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