var express    = require('express'),
    passport   = require('passport'),
    middleware = require("./../middleware");

var router  = express.Router();

// Index
router.get("/", function(req, res){
    res.render("index");
});

// --- LOGIN SYSTEM --- //
router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/", 
        failureRedirect: "/login"
    }), function(req, res){
});
router.get("/logout", middleware.isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/login");
});

// Project page
router.get("/project", function(req, res){
    res.render("project");
});

// Support page
router.get("/support", function(req, res){
    res.render("support");
});

// Library page
router.get("/library", function(req, res){
    res.render("library");
});

module.exports = router;