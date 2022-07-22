
//*Asi recibo un mensaje del servidor
// socket.on('mi mensaje', data => {
//     // alert(data)
//     let algo = document.getElementById("algo");
//     algo.innerHTML = data;

//     //*Asi le envio un mensaje al servidor:
//     socket.emit("notificacion", "Este mensaje es del usuario para el servidor");

// })

// function hola() {
//     


//     messageForm.addEventListener("click", e => {
//         agregarAlCarrito(e)
//     })
// }
$(function () {
    const socket = io();

    const messageForm = $("#message-form");
    const messageBox = $("#message");
    const chat = $("#chat");

    messageForm.submit(e => {
        e.preventDefault();
        socket.emit("send_msg", messageBox.val());
        messageBox.val("");
    });

    socket.on("new_msg", data => {
        // chat.append("<b>" + data.user + "</b>: " + data.msg + "<br/>");
        chat.append(`
            <div class="bg-primary">
                 <b>Usuario</b>: ${data}
            </div>
        
            <br/>
        `);
    })
})