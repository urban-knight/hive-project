var User     = require("./../models/user.js");
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

middlewareObj.isAvailable = function (req, res, next){
    var _user = req.body.user;
    User.find({$or: [ {email: _user.email }, { username: _user.username } ]}, function(err, user){
        if (user.length) {
            res.status(500).send({ error: "User with this email/username already exists."});
        } else {
            return next();
        }
    });
}

module.exports = middlewareObj;