let {Router} = require("express");
// let chat = require("./controller/chatController");

module.exports = app =>{
    let router = new Router();

    // app.use("/chatArea", router);

    app.get("/chatArea", (req,res)=>{
        res.sendFile("index.html");
    });
}