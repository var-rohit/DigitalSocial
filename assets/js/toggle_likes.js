class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLikeButton();
    }



    toggleLikeButton(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type : 'post',
                url : $(self).attr('href'),
                
                success : function(data){
                    
                    let likesCount = parseInt($(self).attr('data-likes'));
                    console.log(data);
                    if(data.data.deleted == true){
                        likesCount -= 1;
                    }
                    else{
                        likesCount += 1;
                        
                    }

                    
                    $(self).attr('data-likes',likesCount);
                    $(self).html(`<img src="/images/Like-Button.png" style="height: 20px;width: 20px;" alt="">
                    &nbsp; ${likesCount}`);
                   
                },

                error : function(error){
                    console.log(error.responseText);
                }
            });

        })
    }
}