var fs             = require('fs'),
    express        = require('express'), 
    db             = require('./db.js'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    flash          = require('connect-flash'),
    LocalStrategy  = require('passport-local'),
    session        = require("express-session"),
    methodOverride = require('method-override'),
    app            = express(),
    http           = require('http').Server(app),
    MongoStore     = require('connect-mongo')(session);
    nev            = require('./email-verification')(mongoose);

var User = require('./models/user');

var indexRouter = require("./routes/index"),
    userRouter = require("./routes/user"),
    emailVerificator = require("./routes/email-verificator");

// --- Application configuration --- //
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use('/static', express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// --- Session storage in MongoDB --- //
var sessionStore = new MongoStore({ 
    mongooseConnection: db,
    touchAfter: 24 * 60 * 60
});

// --- PassportJS configuration --- //
app.use(session({
    secret: "encrypt",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
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

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/email-verification", emailVerificator);

app.get("/*", function(req, res){
    res.render("404");
});

// --- Socket.IO setup --- //
var io = require('./utils/socket-io')(http, sessionStore, passport);

module.exports = http;
