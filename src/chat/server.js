const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set("port", process.env.PORT || 6060);

app.use(express.static('./public'));
// Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get("/chatArea", (req, res) => {
    res.sendFile('index.html', { root: __dirname })
});
// El servidor funcionando en el puerto 3000
httpServer.listen(app.get("port"), () => console.log(`SERVER ON http://localhost:${app.get("port")}`));

io.on('connection', (socket) => {

    console.log('New User Connected')

    //*Con esto envio un mensaje al cliente
    // socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')

    socket.on("new_user", (data, cb) => {
        if (users.indexOf(data) != -1) {
            cb(false);
        }else{
            cb(true);
            socket.users = data;
            users.push(socket.users);
        }
    });

    //*Recibo mensaje del usuario:
    socket.on("send_msg", data => {
        io.emit('new_msg', data);
    })

});

