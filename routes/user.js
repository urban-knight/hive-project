var express    = require('express'),
    middleware = require("./../middleware"),
    User       = require("./../models/user.js");
    

var router  = express.Router();

//Temp User verification
router.get("/:key", middleware.isAvailable, function(req, res){
    nev.confirmTempUser(req.params.key, function(err, temp_user) {
        if (err) {
            // handle error...
        } else {
            
            if (temp_user) {
                // user was found!
                User.register(temp_user, temp_user.password, function(err, user){
                    if(err) {
                        res.status(500).send({ error: "User " + user.username + " not created. DB code: " + err });
                    } else {
                        console.log("User "+ user.username +" verified");
                        res.redirect("/login");
                    }
                });           
            } else {
                // user's data probably expired... 
                res.redirect("register");
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