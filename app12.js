
var express       = require("express");
var app           = express();
var body_parser   =  require("body-parser");
var Campground    = require("./models/campgrounds");
var seedDB        = require("./seeds");
var Comment       = require("./models/comment");
var passport      = require("passport");
var localStrategy = require("passport-local");
var User          = require("./models/user");
var methodOverride = require("method-override");
var flash         = require("connect-flash");

var commentRoutes     = require("./routes/comments");
var campgroundRoutes  = require("./routes/campgrounds");
var indexRoutes       = require("./routes/index");

var mongoose       = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(body_parser.urlencoded({extended:true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // conventional 
  app.use(flash());

app.use(express.static(__dirname + "/public"));
//__dirname shows the whole path of the file.. e.g it will show home/ubuntu/workspace/yelpcamp/v5


// seedDB();  //seed the database

// passport configuration
// user.authenticate came with package..passport-local-mongoose

app.use(require("express-session")({
    secret: " love u mum!",
    resave: false,
    saveUninitialized: false
}));



  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

 
 // creating a middleware for currentUser for easily passing to each rout
 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success"); // messages are written in the middleware
     next();
 });

app.get("/", function(req, res){
    res.render("landing");
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelpcamp server  has  started");
});