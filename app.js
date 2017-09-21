var fs             = require('fs'),
    express        = require('express'),
    dataBase       = require('./db.js'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    bcrypt         = require('bcrypt-nodejs'),
    flash          = require('connect-flash'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override');
    nev            = require('./email-verification')(mongoose);

var User = require('./models/user');

var indexRouter = require("./routes/index"),
    userRouter = require("./routes/user"),
    emailVerificator = require("./routes/email-verificator");

// --- Application configuration --- //
app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use('/static', express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

// --- Email verification config --- //
nev.generateTempUserModel(User, function(err, model){
    nev.configure({
        tempUserModel: model
    }, function(error, options){
        if(error) console.log(error);
    });
});

// --- Dynamic EJS-render data --- // 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// --- Routings --- //
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/email-verification", emailVerificator);

app.get("/*", function(req, res){
    res.render("404");
});

module.exports = app;