{
    //method to submit the form data using ajax
    let createPost = function(){
        console.log("In create post start");
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            //as we will manually submit using ajax
            e.preventDefault();


            $.ajax({
                type : 'post', //as it is a post request
                url : '/posts/create', //action of form
                async : false,
                //converts form data into json  
                data : newPostForm.serialize(), 
                 success : function(data){ 
                    //console.log(data);
                    let newPost = newPostDOM(data.data.post,data.data.username);
                    $('.post-list-container').prepend(newPost);
                     successNoty("Post published!");
                     createComment();
                     deletePost();
                    
                   
                },error : function(error){
                    console.log(error.responseText);
                }  
            });
        });

        console.log("In create post end");
     
    }

     //method to create post in DOM    
       let newPostDOM = function(post,user){

        console.log("In new post dom ");
 

        return $(`<div class="mt-5 " id="post-${post._id}">
        <div class="card card-body">
            <h5  style="color:black;text-decoration: underline;" class="card-title">Created by ${ user.fname}</h5>
            <div style="color:black;" class="card-text">${post.content}</div>
        
    <div   style="text-align: right;background-color: black;">
    
        <small>
    
            <a class= "delete-post-button" href="/posts/destroy/${post._id}" >
            Delete Post</a>
          
    
    </small>
       
    </div>
    </div>
        <div class = "comment-list-container mt-5">
        
        </div>
        

       <div class = "comments-container row ">
            <div class="col-12 signup-form ">
                <form action="/comments/create" id="new-comment-form" method="post">
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
    </div>`)

    }


    //method to delete a post from DOM

   
   let deletePost = function(){
    

    console.log("In delete post start");
 

        $('.delete-post-button').click(function(e){
            e.preventDefault();
            //console.log( " : "+ $(this).prop('href'));
            

                $.ajax({
                    type : 'get',
                    url : $(this).prop('href'),
                    success : function(data){
                       // console.log(data);
                        $(`#post-${data.data.post_id}`).remove();
                        successNoty("Post deleted along with associated comments!");
                         
                    },
                    error : function(error){
                        console.log(error.responseText);
                    }
                });

             
    
        });

    
        console.log("In delete post end");
 
     
    }


    let createComment = function(){


        console.log("In create comment start");
 

        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            //as we will manually submit using ajax
            e.preventDefault();


            $.ajax({
                type : 'post', //as it is a post request
                url : '/comments/create', //action of form
                //converts form data into json  
                data : newCommentForm.serialize(), 
                 success : function(data){ 
                    console.log(data);
                    let newComment = newCommentDOM(data.data.comment,data.data.username);
                    console.log($(`#post-${data.data.comment.post}`).find('.comment-list-container'));
                    $(`#post-${data.data.comment.post}`).find('.comment-list-container').prepend(newComment);
                    successNoty("Comment published!");
                    deleteComment(); 

   
                
                   
                },error : function(error){
                    console.log(error.responseText);
                }  
            });
        });
  
        console.log("In create comment end");
 
       
    }


    let newCommentDOM = function(comment,user){
        return $(`<div class="card card-body" id = "comment-${comment._id}" style="color:black; border: none;">
               
             
        <span style="text-align: center;" >${comment.content}</span>
            <span>by-${user.fname}</span>

<span style="text-align: right; background-color: black;" class="border-bottom">
    <small>
   
        <a class= "delete-comment-button" href="/comments/destroy/${comment._id}" >
        Delete</a>
    
</small>
   
</span>
         
       

</div>`);
    }


    let deleteComment = function(){
    

        console.log("In delete comment start");
     
    
            $('.delete-comment-button').click(function(e){
                e.preventDefault();
                //console.log( " : "+ $(this).prop('href'));
                
    
                    $.ajax({
                        type : 'get',
                        url : $(this).prop('href'),
                        success : function(data){
                            console.log(data);
                            $(`#comment-${data.data.comment_id}`).remove();
                            successNoty("Comment deleted!");
                             
                        },
                        error : function(error){
                            console.log(error.responseText);
                        }
                    });
    
                 
        
            });
    
        
            console.log("In delete comment end");
     
         
        }

   


    let successNoty = function(data){
        new Noty({
            theme : 'bootstrap-v4',
            text: data,
            type : 'success',
            layout : 'topRight',
            timeout : 1000
           
         }).show();

    }

    deleteComment();
    createComment();
    deletePost(); 
    createPost();
   
    

   
}
