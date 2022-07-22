let productService = require("../service/productService");
let cluster = require("cluster");
let {logger} = require("../../../utils/pino");


class Product {
    async add(req, res) {
        try {
            let data_prod = req.body;
            await productService.add(data_prod);
            res.redirect("/admin");
        } catch (error) {
            logger.error(error);
        }
    }

    async show_categories(req, res) {
        try {
            let response = await productService.categories();
            res.json(response);
        } catch (error) {
            logger.error(error);
        }
    }

    async getAllProducts(req, res) {
        try {
            let response = await productService.allProducts();
            res.render("admin/productManagement", { response });
            cluster.worker.kill();
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProduct(req, res) {
        try {
            let { id } = req.params;
            await productService.deleteProduct(id);
            res.redirect("/admin");
            cluster.worker.kill();
        } catch (error) {
            logger.error(error);
        }
    }

    async showProduct(req, res) {
        try {
            let { id } = req.params;
            let response = await productService.showProduct(id);
            res.render("admin/editProduct", {response});
            cluster.worker.kill();
        } catch (error) {
            logger.error(error);
        }
    }

    async editProduct(req, res) {
        try {
            let { id } = req.params;
            let prod_info = req.body;
            await productService.editProduct(id,prod_info);
            res.redirect("/admin");
            cluster.worker.kill();
        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = new Product();