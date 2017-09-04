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

//User create
router.get("/new", function(req, res){
    res.render("user/new");
});
router.post("/", middleware.isAvailable, function(req, res){
    var _user = {
        email: req.body.user.email,
        password: req.body.user.password,
        username: req.body.user.username,
        userpic: req.body.user.userpic,
        isOnline: false,
        registered: Date.now(),
    };

    nev.createTempUser(_user, function(err, existingPersistentUser, newTempUser) {
        if (err){
            //error handling
        } else {
            if (existingPersistentUser){
                // handle user's existence... violently. 
            } else {
                // a new user 
                if (newTempUser) {
                    var URL = newTempUser[nev.options.URLFieldName];
                    nev.sendVerificationEmail(newTempUser.email, URL, function(err, info) {
                        if (err){
                            // handle error... 
                        } else {
                            // flash message of success
                            console.log("Verification mail sent to " + newTempUser.email);
                            res.redirect("/");
                        }
                    });
                // user already exists in temporary collection... 
                } else {
                    // flash message of failure... 
                }
            }
        }
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