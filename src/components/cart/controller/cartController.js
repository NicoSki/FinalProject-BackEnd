let cartService = require("../service/cartService");
let {logger} = require("../../../utils/pino");


class Cart {
    async addProd(req, res) {
        try {
            let { size } = req.body;
            let { id } = req.params;
            let email = req.user.email;
            let user_id = req.user.id;
            await cartService.addProduct(id, size,email,user_id);
            res.redirect("/cart");
        } catch (error) {
            logger.error(error);
        }
    }

    async showProd(req, res) {
        try {
            let user_id = req.user.id;
            let response = await cartService.showProducts(user_id);    
            let total = await cartService.showTotal(user_id);      
            res.render("cart/index.ejs", { response,total });
        } catch (error) {
            logger.error(error);
        }
    }

    async productDeleted(req, res) {
        try {
            let { id } = req.params;
            await cartService.deleteProd(id);
            res.redirect("/cart");
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = new Cart();