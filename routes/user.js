var express    = require('express'),
    middleware = require("./../middleware"),
    User       = require("./../models/user.js");
    

var router  = express.Router();

//Users Index
router.get("/", function(req, res){
    User.find({}, function(err, users){
        res.render("user/index", {users: users});
    });
});

//User read
router.get("/:username", function(req, res){
    var _name = req.params.username;

    User.findOne({username: _name}, function(err, user){
        if (err) {
            res.status(500).send({ error: "User " + _name + " not found. DB code: " + err });
        } else {
            res.render("user/show", {user: user});
        }
    });
});

//User create
router.post("/", middleware.isAvailable, function(req, res){
    var _user = {
        email: req.body.user.email,
        username: req.body.user.username,
        userpic: req.body.user.userpic,
        isOnline: false,
        registered: Date.now(),
    };

    User.register(_user, req.body.user.password, function(err, user){
        if(err) {
            res.status(500).send({ error: "User " + _user.username + " not created. DB code: " + err });
        } else {
            console.log("User " + user.username + " created");
            res.redirect("/users/" + user.username);
        }
    });
});

//User update
router.get("/:username/edit", function(req, res){
    var _name = req.params.username;

    User.findOne({username: _name}, function(err, user){
        if (err) {
            res.status(500).send({ error: "User " + _name + " not found. DB code: " + err });
        } else {
            res.render("user/edit", {user: user});
        }
    });
});
router.put("/:id", function(req, res){
    var _user = req.body.user;

    User.findByIdAndUpdate(req.params.id, _user, function(err, updated){
        if (err) {
            res.status(500).send({ error: "User " + _user.username + " not updated. DB code: " + err });
        } else {
            res.redirect("/users/" + updated.username);
        }
    });
});

//User delete
router.delete("/:id", function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.status(500).send({ error: "User not removed. DB code: " + err });
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;