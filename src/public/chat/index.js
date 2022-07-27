
$(function () {
    const socket = io();

    const messageForm = $("#message-form");
    const messageBox = $("#message");
    const chat = $("#chat");
    const selected_option = $("#option");


    messageForm.submit(e => {
        e.preventDefault();
        socket.emit("send_msg", messageBox.val());
        messageBox.val("");
    });

    selected_option.change(function(){
        socket.emit("changed option", selected_option.val());
    });

    socket.on("new_msg", (data) => {
        chat.append(`
            <div class="bg-primary">
                 <b>You</b>: ${data}
            </div>
        
            <br/>
        `);
    });

    socket.on("changed option", (option)=>{
        messageBox.html("").append(
           ` <div class="bg-warning">
                 <b>ADMIN:</b>: Welcome to ${option} chat!
            </div>
        
            <br/>`
        );
    })
})