var express    = require('express'),
    middleware = require("./../middleware"),
    Post       = require("./../models/post.js"); 

var router  = express.Router();

//News Index
router.get("/", async (req, res)=>{
    var posts = await Post.findAsync({});
    res.render("post/index", {posts: posts});
});

//News Show
router.get("/:url", async (req, res)=>{
    var url = req.params.url;
    var post = await Post.findOneAsync({url: url});
    res.render("post/show", {post: post});
});

module.exports = router;
