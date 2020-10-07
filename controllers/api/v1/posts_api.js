const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index =async function(req,res){


              //populate user of each post (this user is taken via post schema) , this is preloading users
       let posts = await Post.find({}).sort('-createdAt').populate('user')
       .populate({
           path : 'comments',
           options: { sort: { 'createdAt': -1 } },
           populate : {
               path : 'user'
           }
       }).sort('-createdAt') ; 
    

    return res.json(200,{
        message : "List of posts",
        posts : posts
    })
}

module.exports.destroy = async function(req,res){ 
    
    try {
        
            let post = await Post.findById(req.params.id);
        
        
            //.id means converting the object._id into string
             
            if(post.user == req.user.id)
            {post.remove();

                await Comment.deleteMany({post : req.params.id});
              
               
                return res.json(200,{
                    message : "Post and associated comments deleted successfully"
                });

            }
            else{
                return res.json(401,{
                    message : "You cannot delete this post"
                });
         
            }
    } catch (error) {


        console.log(error);
        
        return res.json(500,{
            message : "Internal server error"
        });
        

    }
}