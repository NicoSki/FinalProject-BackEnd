let { Router } = require("express");
let prod = require("./controller/productController");
let cluster = require("cluster");


module.exports = app => {
    let router = new Router();

    // app.use("/admin", router);

    //*SHOW PRODUCTS
    router.get("/",prod.getAllProducts);

    //*ADD PRODUCTS
    router.get("/addProduct", (req, res) => {
        res.render("admin/createProduct")
        cluster.worker.kill();
    });
    router.post("/addProduct", prod.add);

    //*DELETE PRODUCTS
    router.get("/deleteProduct/:id",prod.deleteProduct);

    //*UPDATE PRODUCTS
    router.get("/editProduct/:id",prod.showProduct);
    router.post("/editProduct/:id",prod.editProduct);

}