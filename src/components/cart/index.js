let { Router } = require("express");
let cart = require("./controller/cartController");


module.exports = (app, auth) => {
    let router = new Router();

    app.use("/cart", router);

    router.get("/", auth, cart.showProd);
    router.get("/:id", auth, cart.addProd);
    router.post("/:id", auth, cart.addProd);
    router.get("/deletProd/:id", auth, cart.productDeleted);
}