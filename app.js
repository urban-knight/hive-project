var express        = require('express'),
    dataBase       = require('./db.js'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override');
    nev            = require('email-verification')(mongoose);

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

// --- Email verification config --- //
nev.configure({
    verificationURL: 'http://hive-gaming.ga/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'temp_users',
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'development.hive@gmail.com',
            pass: 'BnBKGPbh'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <development.hive_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
}, function(error, options){
});
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
    next();
});

// --- Routings --- //
app.use("/", indexRouter);
app.use("/users", userRouter);

app.get("/*", function(req, res){
    res.render("404");
});

module.exports = app;