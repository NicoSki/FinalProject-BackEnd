let { Router } = require("express");
const passport = require("passport");
let cluster = require("cluster");

module.exports = app => {
    let router = new Router();

    
    app.use("/user", router);

    //*SIGNIN
    router.get("/signin", (req, res) => res.render("forms/signin"));
    router.post("/signin", passport.authenticate("signin-user", {
        successRedirect: "/profile",
        failureRedirect: "/user/signin",
        passReqToCallback: true
    }));


    //*LOGIN
    router.get("/login", (req, res) => res.render("forms/login"));
    router.post("/login", passport.authenticate("login-user", {
        successRedirect: "/cart",
        failureRedirect: "/user/login",
        passReqToCallback: true
    }));

    router.post("/loginAdmin", passport.authenticate("login-admin", {
        successRedirect: "/admin",
        failureRedirect: "/user/login",
        passReqToCallback: true
    }));

    //*EXIT SESSION
    router.get("/exit", (req, res, next) => {
        req.logout();
        res.redirect("/products");
    });
}