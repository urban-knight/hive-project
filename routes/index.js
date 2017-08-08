var express  = require('express');

var router  = express.Router();

// Index
router.get("/", function(req, res){
    res.render("index");
});

// About page
router.get("/about", function(req, res){
    res.render("page/about");
});

module.exports = router;