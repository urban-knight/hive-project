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
router.post("/login", function(req, res, next) {
    if (req.body.remember_me == "on"){
        var expired = 2592000000; //30 days
        req.session.cookie.expires = new Date(Date.now() + expired)
        req.session.cookie.maxAge = expired;
    } else {
        req.session.cookie.expires = false;
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
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

// Store page
router.get("/store", function(req, res){
    res.render("store");
});

// MTA page
router.get("/mta", function(req, res){
    res.render("mta");
});

// HiveCraft page
router.get("/hivecraft", function(req, res){
    res.render("hivecraft");
});

// Donate page
router.get("/donate", function(req, res){
    res.render("donate");
});

module.exports = router;