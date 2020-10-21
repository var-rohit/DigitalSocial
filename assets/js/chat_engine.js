class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        console.log("in chat engine ",userEmail);

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

           
               

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'digital'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message',{
                    message : msg,
                    user_email: self.userEmail,
                    chatroom: 'digital'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

           /* newMessage.append($('<span>',{
                'html' : data.message
            }));

            newMessage.append($('<li>',{
                'html' : data.user_email
            }));*/

            newMessage.append($ (`<div class="card border-0" style="background-color :  #f0f0f0;"            ">
  <div class="card-body" style="border-style:none;>
    
    <p class="card-text">${data.message}</p>
    <h6 class="card-subtitle  text-muted" style="font-size:10px">${data.user_email}</h6>
     </div>
</div>`));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);

            if($('#user-chat-box').css('display') == 'none'){
                $('#user-chat-box').fadeIn('slow');
                document.getElementById("open-button").innerHTML = "Close";
            }


        })

       

        
    }
}