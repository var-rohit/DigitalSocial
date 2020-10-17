const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = async function(req,res){
   
    try {
            
   let post =  await Post.create({
        content : req.body.content,
        user : req.user._id
    }); 
    
   post = await post.populate('user','fname').execPopulate();

    //to check that req is ajax request,so it should be xml http req(xhr)
    if(req.xhr)
    {
        
        return res.status(200).json({
            data: {
                post : post
            },
            message : "Post created !"
        });
    }

          req.flash('success',"Post published!");
          return res.redirect('back');
    
    } catch (error) {
       
        req.flash('error',error);
        return res.redirect('back'); 
    }
   
   
  
}

module.exports.destroy = async function(req,res){ 
    
    try {
        
            let post = await Post.findById(req.params.id);
        
        
            //.id means converting the object._id into string
            if(post.user == req.user.id){
                post.remove();

                await Comment.deleteMany({post : req.params.id});
              
                if(req.xhr){
                   // console.log(req.params.id);

                    return res.status(200).json({
                        data : {
                            post_id : req.params.id
                            
                        },
                    
                        message: "Post deleted"
                    });
                }
                
                req.flash('success',"Post deleted along with associated comments!");
                return res.redirect('back');
                
            } 
            else
            {
                req.flash('error',error);
                return res.redirect('back');
               
            }
            
    } catch (error) {

        
        req.flash('error',error);
        return res.redirect('back');
        

    }
}