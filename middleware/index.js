
var Campground = require("../models/campgrounds");
var Comment= require("../models/comment");


// all middleware

var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req, res, next){
     //is user logged in at all?
         if(req.isAuthenticated()){
         
           Campground.findById(req.params.id, function(err, foundCampground){
               if(err){
                   req.flash("error", "Campground not found");
                res.redirect("back");
                  }else{
              // does the user own the campground ?.. foundCampground.author.id is an object
              
              
             if(foundCampground.author.id.equals(req.user._id )){
                 next();
                 
                 }  else{
                     req.flash("error", "you don't have permission to do that")
                       res.redirect("back");
                   }
                }
                 });
                }  else{
                    req.flash("error", "You need to be logged in to do that");
        
                  res.redirect("back"); // send them to where they're from
       }
}
    
    


middlewareObj.checkCommentOwnership = function(req, res, next){

     //is user logged in at all?
         if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                res.redirect("back");
               } else {
              // does the user own the Comment ?.. foundComment.author.id is an object
              
             if(foundComment.author.id.equals(req.user._id )){
                 next();
                 
             }else{
                  req.flash("error", "You don't have permission to do that");
                 res.redirect("back");
                   }
                }
             });
                }  
                
                else{
                     req.flash("error", "You need to be logged in to do that");
                  res.redirect("back"); // send them to where they're from
       }
}

// middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that"); // before redirecting
    res.redirect("/login");
}


module.exports = middlewareObj;
