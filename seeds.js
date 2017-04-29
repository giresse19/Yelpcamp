// the purpose of the seeds file is that we can run it with our database to see if it would work..
//.. error driven development.. i.e, creating error in the application then solving the error later
// seeds will destroy everything in campground database then create new ones with comments.. so we have data to work with


var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name: "cloud's rest",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/cf/a5/45/campgrounds.jpg",
        description: "Lorem ipsum dolor sit amet, et ac nec mattis inventore et, id consequatur, purus donec nam mauris. Morbi ut, quis ut et platea, sed aliquet consectetuer aenean pharetra est lacus, semper eget id in urna ornare. Leo vitae turpis justo rhoncus ultrices in, ut purus vivamus erat pellentesque eget dolor, at vitae aperiam elementum malesuada suscipit et. Arcu a ipsum sed orci, egestas vel etiam tortor sit, nonummy velit sodales et at lectus, tincidunt aliquet dictum neque quisque consequat odio. Luctus nec, sed nullam sit per aliquet convallis, egestas donec est non nonummy aliquet bibendum, felis nam et elementum odio cras. Ac justo eu nunc mauris. Egestas ac arcu dictum rhoncus sed turpis. Ultricies ac commodo cras erat nunc, integer parturient elit wisi, venenatis orci et laoreet sem congue, eget porta consectetuer vestibulum ut velit imperdiet. Aliquam eu, nunc nunc elit vel vitae nonummy, voluptates sociosqu phasellus erat eos sodales, dolorem etiam vulputate dictum. Nam vel porttitor sapien elit commodo mauris, nulla in, consectetuer lectus ullamcorper eleifend etiam suspendisse scelerisque, sed vel. Non pede integer suspendisse ultricies sem vestibulum, erat mauris lobortis donec nullam quis arcu. Eget aenean mauris hymenaeos duis felis nulla, libero eu aliquet ullamcorper erat proin, mauris mollis leo rhoncus ullamcorper, maecenas quam fringilla purus non eu sed."
    },
     {
        name: "restful data",
        image: "https://s-media-cache-ak0.pinimg.com/736x/f0/9b/11/f09b1110c02ba6be19a85891b2c4a60b.jpg",
        description: "Lorem ipsum dolor sit amet, et ac nec mattis inventore et, id consequatur, purus donec nam mauris. Morbi ut, quis ut et platea, sed aliquet consectetuer aenean pharetra est lacus, semper eget id in urna ornare. Leo vitae turpis justo rhoncus ultrices in, ut purus vivamus erat pellentesque eget dolor, at vitae aperiam elementum malesuada suscipit et. Arcu a ipsum sed orci, egestas vel etiam tortor sit, nonummy velit sodales et at lectus, tincidunt aliquet dictum neque quisque consequat odio. Luctus nec, sed nullam sit per aliquet convallis, egestas donec est non nonummy aliquet bibendum, felis nam et elementum odio cras. Ac justo eu nunc mauris. Egestas ac arcu dictum rhoncus sed turpis. Ultricies ac commodo cras erat nunc, integer parturient elit wisi, venenatis orci et laoreet sem congue, eget porta consectetuer vestibulum ut velit imperdiet. Aliquam eu, nunc nunc elit vel vitae nonummy, voluptates sociosqu phasellus erat eos sodales, dolorem etiam vulputate dictum. Nam vel porttitor sapien elit commodo mauris, nulla in, consectetuer lectus ullamcorper eleifend etiam suspendisse scelerisque, sed vel. Non pede integer suspendisse ultricies sem vestibulum, erat mauris lobortis donec nullam quis arcu. Eget aenean mauris hymenaeos duis felis nulla, libero eu aliquet ullamcorper erat proin, mauris mollis leo rhoncus ullamcorper, maecenas quam fringilla purus non eu sed."
      },
     {
        name: "peruvera rest",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/cf/a5/45/campgrounds.jpg",
        description: "Lorem ipsum dolor sit amet, et ac nec mattis inventore et, id consequatur, purus donec nam mauris. Morbi ut, quis ut et platea, sed aliquet consectetuer aenean pharetra est lacus, semper eget id in urna ornare. Leo vitae turpis justo rhoncus ultrices in, ut purus vivamus erat pellentesque eget dolor, at vitae aperiam elementum malesuada suscipit et. Arcu a ipsum sed orci, egestas vel etiam tortor sit, nonummy velit sodales et at lectus, tincidunt aliquet dictum neque quisque consequat odio. Luctus nec, sed nullam sit per aliquet convallis, egestas donec est non nonummy aliquet bibendum, felis nam et elementum odio cras. Ac justo eu nunc mauris. Egestas ac arcu dictum rhoncus sed turpis. Ultricies ac commodo cras erat nunc, integer parturient elit wisi, venenatis orci et laoreet sem congue, eget porta consectetuer vestibulum ut velit imperdiet. Aliquam eu, nunc nunc elit vel vitae nonummy, voluptates sociosqu phasellus erat eos sodales, dolorem etiam vulputate dictum. Nam vel porttitor sapien elit commodo mauris, nulla in, consectetuer lectus ullamcorper eleifend etiam suspendisse scelerisque, sed vel. Non pede integer suspendisse ultricies sem vestibulum, erat mauris lobortis donec nullam quis arcu. Eget aenean mauris hymenaeos duis felis nulla, libero eu aliquet ullamcorper erat proin, mauris mollis leo rhoncus ullamcorper, maecenas quam fringilla purus non eu sed."
    }
]

// remove all campgrounds.
function seedDB(){
  Campground.remove({}, function(err){
    if(err){
         console.log(err);
       }
   console.log("remove campgrounds");
   
   // add a few campgrounds
   
data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if (err){
            console.log(err);
        }else{
            console.log("added a campground");
            // create comments
            Comment.create(
                {
                text: " this place is lovely damn it",
                author:"donam"
              }, function(err, comment){
                  if(err){
                       console.log(err);
                  }else{
                      campground.comments.push(comment);
                      campground.save();
                      console.log("created new comments")
                  }
              });
         }
      })
   });
    
 });
    
};

module.exports = seedDB;