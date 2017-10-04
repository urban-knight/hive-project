var express    = require('express'),
    router  = express.Router();

// Index
router.get("/", function(req, res){
    res.send("Welcome to Hive API!");
});

module.exports = router;