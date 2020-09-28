const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
   
    try {
            
    await Post.create({
        content : req.body.content,
        user : req.user._id
    });     

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
                
                req.flash('success',"Post deleted along with associated comments!");
                return res.redirect('back');
                
            } 
            else
            {
                return res.redirect('back');
            }
            
    } catch (error) {

        
        req.flash('error',error);
        return res.redirect('back');
        

    }
}