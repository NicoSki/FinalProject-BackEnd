let {logger} = require("../utils/pino");

module.exports = function (io) {
    io.on('connection', (socket) => {

        logger.info(`New User Connected: ${socket.id}`);

        let option = "public";

        socket.join(option);


        socket.on("send_msg", data => {
            // io.emit('new_msg', data);
            io.sockets.in(option).emit('new_msg', data);
        });

        socket.on("disconnect", ()=>{
            logger.fatal(`User ${socket.id} is Disconnected`);
        });

        socket.on("changed option", (newOption)=>{
            socket.leave(option);
            socket.join(newOption);
            option = newOption;
            socket.emit("changed option", newOption);
        })

    });


}