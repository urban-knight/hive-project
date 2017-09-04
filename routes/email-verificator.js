var express    = require('express'),
    middleware = require("./../middleware"),
    User       = require("./../models/user.js");
    

var router  = express.Router();

//Verify Temp_User
router.get("/:key", function(req, res){

    nev.confirmTempUser(req.params.key, function(err, user) {
        if (err){
            // handle error... 
        } else {     
            if (user) {
                console.log("User " + user.username + " verified.");
                res.redirect("/login");
            } else {
                // user's data probably expired... 
                // redirect to sign-up
                res.redirect("/register");
            }
        }
    });
});

module.exports = router;