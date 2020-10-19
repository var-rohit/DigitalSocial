class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });

    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            //console.log("create comment");

            let self = this;

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : $(self).serialize(),
                success : function(data){
                    //console.log("create comment ",data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);

                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new ToggleLike($(' .toggle-like-button',newComment));

                    new Noty({
                        theme: 'bootstrap-v4',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    newCommentDom(comment){
        return $(` <div class="card card-body" id = "comment-${ comment._id }" style="color:black; border: none;">
                
                
        <span style="text-align: center;" >
        ${ comment.content }
        </span>
        <span>
            by-${ comment.user.fname }
        </span>
            
        <div class="border-bottom">
            <small>
            <span style="margin-right: 70%;color:black;">
                <a class="toggle-like-button" data-likes="${ comment.likes.length }" style="color: black;text-decoration: none;" href="/likes/toggleLike/?id=${ comment._id }&type=Comment">
                     <img src="/images/Like-Button.png" style="height: 20px;width: 20px;" alt="">
                    &nbsp;0
                </a>  
            </span>
            <span style="margin-left: 70%px;">
                    <a class= "delete-comment-button" style="color: #5cb85c"  href="/comments/destroy/${ comment._id }" >
                    <img src="/images/Delete-Button.png" style="height: 15px;width: 15px;" alt="">
              
                    </a>
            </span>
               
            </small>
        </div>
                    
    </div>`)
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            //console.log("delete comment");

            $.ajax({
                type: 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    //console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'bootstrap-v4',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                error : function(error){
                    console.log(error.responseText);
                }
            })

        })
    }
}