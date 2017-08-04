var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/cms/login");
    }
}

module.exports = middlewareObj;