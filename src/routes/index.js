// let productAPI = require("../components/product");
let cartAPI = require("../components/cart");
let userAPI = require("../components/users");
let order = require("../components/orders");
let DAO = require("../components/product/service/productService");


module.exports = app => {

    //*ALLOW PAGES ACCESS
    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/user/login");
    }

    // productAPI(app);

    cartAPI(app,isAuthenticated);

    userAPI(app);

    order(app, isAuthenticated);


    app.get("/", (req, res) => {
        res.redirect("/products");
    });


    //*MAIN URL:
    app.get("/products", async (req, res) => {
        let response = await DAO.categories();
        res.render("main", { response });
    });



    app.get("/products/:categorie", async (req, res) => {
        let { categorie } = req.params;
        let response = await DAO.categories();

        if (categorie == "shirt") {
            res.render("particular", { response: response.shirt });
        }

        if (categorie == "button-down") {
            res.render("particular", { response: response.button_down });
        }

        if (categorie == "trouser") {
            res.render("particular", { response: response.trouser });
        }

        if (categorie == "shoe") {
            res.render("particular", { response: response.shoes });
        }
    });

    app.get("/products/:categorie/:id", isAuthenticated,async (req, res) => {
        let { categorie, id } = req.params;
        let response = await DAO.categories();
        let prod;
        if (categorie == "shoe") {
            prod = response.shoes.filter(e => e._id == id);
        }

        if (categorie == "shirt") {
            prod = response.shirt.filter(e => e._id == id);
        }

        if (categorie == "trouser") {
            prod = response.trouser.filter(e => e._id == id);
        }

        if (categorie == "button-down") {
            prod = response.button_down.filter(e => e._id == id);
        }

        res.render("product", { prod });
    });

    app.get("/profile", isAuthenticated, async (req, res) => {
        let data = {
            username: req.user.username,
            surname: req.user.surname,
            email: req.user.email,
            phone: req.user.phone,
            address: req.user.address
        }
        res.render("profile", { data });
    });


    

}