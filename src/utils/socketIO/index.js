const express = require("express");

const app = express();

const server = require("http").Server(app);
const socketIO = require("socket.io")(server);

app.set("port", process.env.PORT || 6060);

require("./socket")(socketIO);

server.listen(app.get("port"), ()=>{
    console.log(`Socket on port ${app.get("port")}`);
})
