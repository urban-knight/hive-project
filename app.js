var express        = require('express'),
    dataBase       = require('./db.js'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override');

var User = require('./models/user');

var indexRouter = require("./routes/index"),
    userRouter = require("./routes/user");

// --- Application configuration --- //
app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use('/static', express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// --- PassportJS configuration --- //
app.use(require("express-session")({
    secret: "encrypt",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- Dynamic EJS-render data --- // 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// --- Routings --- //
app.use("/", indexRouter);
app.use("/users", userRouter);

app.get("/*", function(req, res){
    res.render("404");
});

module.exports = app;