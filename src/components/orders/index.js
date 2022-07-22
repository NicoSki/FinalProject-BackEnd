let {Router} = require("express");
let order = require("./controller/orderController");


module.exports = (app, auth) => {
    let router = new Router();

    app.use("/orderSent", router);
    
    router.get("/",auth,order.sendOrder);
}