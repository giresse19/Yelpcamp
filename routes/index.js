
var express  = require("express");
var router   = express.Router();
var User     = require("../models/user");
var passport = require("passport");


// show register form
router.get("/register", function(req, res) {
    
    res.render("register");
});

// handle signup logic
// provided by passport-local-mongoose package..user.register

router.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
          req.flash("error", err.message);
           return res.redirect("/register")
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Yelpcamp " + user.username);
           res.redirect("/campgrounds");
       });
   });  
});

// handling login logic

// show login form..handle flash message here

router.get("/login", function(req, res) {
    res.render("login");
});

//handling loggin post...app.post("/login", middleware, callback)

router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),  function(req, res) {
});

// logout route

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Good Bye!");
    res.redirect("/campgrounds")
});


module.exports= router;


