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
            
        <span style="text-align: right;" class="border-bottom">
            <small>
                 
                    <a class= "delete-comment-button" style="color: #5cb85c"  href="/comments/destroy/${ comment._id }" >
                        Delete
                    </a>
               
            </small>
        </span>
                    
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