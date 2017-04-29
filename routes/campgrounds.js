
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware"); 

// if u name a file index.js and require the directory, index.js will be required




// INDEX ROUTE...get all campgrounds from the db
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
// addng logic inwhich user sees only what is necessary to login, logout, signup
        res.render("campgrounds/index", {campgrounds: allCampgrounds, 
        currentUser: req.user});
     }
        
    });
});

// CREATE ROUTE... ADD NEW CAMPGROUNDS TO DB
router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
       // get data from form and add to campgrounds array
       
       var name = req.body.name;
       var price = req.body.price;
       var image = req.body.image;
       var description = req.body.description;
       var author    = {
           id: req.user._id,
           username  : req.user.username
       }
var new_campground = {name: name, price: price, image:image, description: description, author: author};
     
     // create a new campground and save to db
      Campground.create(new_campground, function(err, newlyCreated){
          if(err){
              console.log(err);
          }else{
              // console.log(newlyCreated);
              res.redirect("/campgrounds"); // default redirect is a get request
              
          }
      });
});
 
 // NEW... show form to create new campground

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW ROUTE.. SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/campgrounds/:id", function(req, res) { // make sure the order of route is okay.. if /id comes before new, it will show new as ID..
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log("err");
       }else{
           //console.log(foundCampground);
           // render show template with that campground
          res.render("campgrounds/show", {campground: foundCampground});
       }
   });
  
});


// edit campground route.. need a form for edit
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground)
    {
         res.render("campgrounds/edit", {campground: foundCampground});
                
      });
  });
   

// update campground route.. form submit somewhere for update..
//id to find by, data to update with and call back function
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership ,function(req, res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground ){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

//destroy campground route

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds")
      }
   });
});



module.exports= router;
