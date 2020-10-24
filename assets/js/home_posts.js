{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

           // console.log("create post");

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    // console.log("data in create post ",data);
                     let newPost = newPostDom(data.data.post);
                     $(' .post-list-container').prepend(newPost);
                     deletePost($(' .delete-post-button',newPost));

                     new PostComments(data.data.post._id);

                     new ToggleLike($(' .toggle-like-button',newPost));

                     new Noty({
                        theme: 'bootstrap-v4',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },

                error : function(error){
                    console.log(error.responseText);
                }
            });

        });

    }

    //method to create a post in DOM

    let newPostDom = function(post){

       
        return $(`<div class="mt-5 " id="post-${post._id}">
        <div class="card card-body">
                <h5  style="color:black;text-decoration: underline;" class="card-title">
                          Post created by ${ post.user.fname }
                </h5>
                <div style="color:black;" class="card-text">
                ${ post.content }
                </div>
            
            <div >
                <small>
               

                <span style="margin-right: 70%;color: black;" >
               
             <a class="toggle-like-button" data-likes="${ post.likes.length }" style="color: black;text-decoration: none;" href="/likes/toggleLike/?id=${post._id }&type=Post">
                <img src="/images/Like-Button.png" style="height: 20px;width: 20px;" alt="">
                &nbsp;0
             </a>  
            
            </span>



            <span style="margin-left: 70%px;"> 
                    <a class= "delete-post-button" style="color: #5cb85c"  href="/posts/destroy/${post._id }" >
                        <img src="/images/Delete-Button.png" style="height: 15px;width: 15px;" alt="">
                    </a>
                </span>
                </small>
            
            </div>
        </div>
            
        <div class = "comment-list-container mt-5"  id = "post-comments-${post._id}">
    
            
             
           
        </div>
    
        <div class = "comments-container row ">
            
                <div class="col-12 signup-form ">
                    <form action="/comments/create" id="post-${post._id}-comments-form" method="post">
                        <div class="form-group">
                                <textarea class="form-control" name = "content" rows="2" id="comment" placeholder="Please type in your comment here..." required="required"></textarea>
                                <input type="hidden" name="post" value="${post._id}">  
                            </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-success btn-lg btn-block">Add comment</button>
                        </div>
                    </form>
                </div>   
                
                    
                    
                    
        </div>
    </div>
    
    `)
    }


    let deletePost = function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();

                $.ajax({
                    type : 'get',
                    url : $(deleteLink).prop('href'),
                    success : function(data){
                       // console.log(data);
                       $(`#post-${data.data.post_id}`).remove();
                       new Noty({
                        theme: 'bootstrap-v4',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                        }).show();
                    },

                    error : function(error){
                        console.log(error.responseText);
                    }
                });
            })
    }

    let convertPostsToAjax = function(){
        $(' .post-list-container>div').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button',self);
            deletePost(deleteButton);

            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);

        });
    }




convertPostsToAjax();
createPost();
}
