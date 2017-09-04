var express    = require('express'),
    middleware = require("./../middleware"),
    User       = require("./../models/user.js");
    

var router  = express.Router();

//Verify Temp_User
router.get("/:key", function(req, res){

    nev.confirmTempUser(req.params.key, function(err, temp_user) {
        if (err){
            // handle error... 
        } else {
            // user was found! 
            if (temp_user) {
                User.register(temp_user, temp_user.password, function(err, user){
                    if(err) {
                        
                    } else {
                        console.log("User " + user.username + " verificated.");
                        res.redirect("/login");
                    }
                });
            } else {
                // user's data probably expired... 
                // redirect to sign-up
                res.redirect("/register");
            }
        }
    });
});

module.exports = router;