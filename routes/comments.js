
var express = require("express");
var router = express.Router();

var Campground = require("../models/campgrounds");
var Comment    = require("../models/comment");
var middleware = require("../middleware"); 



router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    
Campground.findById(req.params.id, function(err, campground){
    if(err){
        console.log(err);
    }else{
         res.render("comments/new", {campground: campground});
    }
  });
   
});

//comment create  route
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
    // lookup campgrounds using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
             
             // create new comment
            
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("error", "something went wrong");
                   console.log(err);
               } else{
                   // add username and id to comment
                   comment.author.id        =  req.user._id;
                   comment.author.username  =  req.user.username;
                   // save commnent
                   comment.save();
                      // connecting new comment to  campground
                   campground.comments.push(comment);
                   campground.save();
                  // console.log(comment);
                   // redirect campground to show page
                    req.flash("success", "Successfully added comment");
                   res.redirect('/campgrounds/' + campground._id);
               }
            });
           
        }
    });
});

// comment edit route
// we don't need all the data from campground but only the id..
// we make a variable of the id in the comment model
   
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err,foundComment ){
       if(err){
           req.flash("error", "something went wrong");
           res.redirect("back");
       }else{
           res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});
       }
   });
});

// comment update route 
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership ,function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, 
            function(err, updatedComment){
                if(err){
                    res.redirect("back");
                } else{
                    res.redirect("/campgrounds/" + req.params.id);
                    
                }
            });
});

// Comment destroy route
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
             req.flash("success", "comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
            
        }
    });
    
});



module.exports= router;
