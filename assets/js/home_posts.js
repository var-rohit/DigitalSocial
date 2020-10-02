{
    //method to submit the form data using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            //as we will manually submit using ajax
            e.preventDefault();


            $.ajax({
                type : 'post', //as it is a post request
                url : '/posts/create', //action of form
                //converts form data into json  
                data : newPostForm.serialize(), 
                 success : function(data){ 
                    //console.log(data);
                    let newPost = newPostDOM(data.data.post,data.data.username);
                    $('.post-list-container').prepend(newPost);
                   // deletePost();
                   
                },error : function(error){
                    console.log(error.responseText);
                }  
            });
        });
    }

     //method to create post in DOM    
       let newPostDOM = function(post,user){

            


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
        <div class = "post-comments_list mt-5">
        
        </div>
        

       <div class = "comments-container row ">
            <div class="col-12 signup-form ">
                <form action="/comments/create" method="post">
                    <div class="form-group">
                            <textarea class="form-control" name = "content" rows="2" id="comment" placeholder="Please type in your comment here..." required="required"></textarea>
                            <input type="hidden" name="post" value="<${post._id}">  
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

  /*  let deletePost = function(){

        $('.delete-post-button a').each(function(index){
            console.log(index + " : "+ $(this).prop('href'));
            

            $('.delete-post-button a').click(function(e){
                e.preventDefault();
    
    
                $.ajax({
                    type : 'get',
                    url : $(this).prop('href'),
                    success : function(data){
                        console.log(data);
                        $(`#post-${data.data.post_id}`).remove();
                    },
                    error : function(error){
                        console.log(error.responseText);
                    }
                })
            });
        });

       /* $(deleteLink).click(function(e){
            e.preventDefault();


            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                   // console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        });


    }
*/
    createPost(); 
    

   
}
