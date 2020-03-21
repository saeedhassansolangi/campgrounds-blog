const expresss = require("express");
const router = expresss.Router();
const Campgound = require('../models/campground')
const middleware = require("../middlewares")


router.get("/", (req, res) => {
    Campgound.find({},(err,allCampgroundss)=>{
      if(err){
        console.log("oops there is an error");
      }else{
        res.render("campgrounds/campgrounds", { campgrounds: allCampgroundss , currentUser :req.user });
      }
    }) 
   
  });
  

  router.post("/", middleware.isLoggedIn,(req, res) => {
    // console.log(req.body.name, "||", req.body.image);
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
      id:req.user._id,
      username:req.user.username
    }
    var campground = { name: name,price:price, image: image ,description:description,author:author};
    // console.log("IN POST ROUTE",req.user);
    
    Campgound.create(campground,(err,item)=>{
      if(err){
        console.log("oh no There is an error",err);
      }else{
        console.log("oh yes it works");
        console.log(item);
        req.flash("primary","Campground is Added Successfully ",author.username)
          res.redirect("/campgrounds");
        
      }
    })
  });
  
  router.get("/new", middleware.isLoggedIn,(req, res) => {
    res.render("campgrounds/new");
   
  });
  
  
  router.get("/:id",(req,res)=>{
    Campgound.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
      if(err){
        console.log("Campground NOt found",err);
        
      }else{
        res.render("campgrounds/show",{foundCampground:foundCampground})
      }
    })
  })

// // EDIT CAMPGROUND ROUTE
// router.get("/:id/edit",(req,res)=>{
//   // res.send("This is Campground EDT Route")
//   Campgound.findById(req.params.id,(err,foundCampground)=>{
//     if(err){
//       console.log("Error in Edit Route of Campgrounds",err);
//       res.redirect("/campgrounds")
      
//     }else{
//       res.render("campgrounds/edit",{campground:foundCampground})
//     }
//   })
  
// })
  


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
  Campgound.findById(req.params.id,(err,foundCampground)=>{
    if(err){
      req.flash("error","You dont have Permission to do that")
    }
    else{
      res.render("campgrounds/edit",{campground:foundCampground})
    }
  
  })
  // // is user logged in
  // if(req.isAuthenticated()){
  //   Campgound.findById(req.params.id,(err,foundCampground)=>{
  //     if(err){
  //       console.log("Error in Edit Route of Campgrounds",err);
  //       res.redirect("/campgrounds")
        
  //     }else{
  //          //does user own campground
  //          //console.log(req.user._id);               //5e60a033731b3d5e5b25577e
  //          //console.log(foundCampground.author.id)   //5e60a033731b3d5e5b25577e
  //         //boths value are same but foundCampgroud.author.id is an object and req.user._id is String so mongoose provides us a method called .equal() to compare object with string
  //          if(foundCampground.author.id.equals(req.user._id)){

  //           res.render("campgrounds/edit",{campground:foundCampground})
           
  //         }else{
  //            res.send("YOu dont Have permission to Do that")
             
  //          }
        
  //     }
  //   })
  // } else{
  //   console.log("You Need to be Logged In to do that");
  //   res.send("You Need to be Logged In to do that")
    
  // }
    
  //   //otherwise redirect
  // //if not , redirect 
 
})
  

// //UPDATE CAMPGROUND ROUTE

// router.put("/:id",(req,res)=>{
//   //find and Update the Campground
//   Campgound.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
//     if(err){
//       console.log("Error IN Updating Campground",err);
//       res.redirect("/campgrounds")

//     }else{
//       console.log("CAMPGROUND UPDATED");
//       res.redirect("/campgrounds/" + req.params.id)
//     }
//   })
//   //redirect to someOne
//   // res.send("Hello")
// })

//UPDATE CAMPGROUND ROUTE

router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
  //find and Update the Campground
  Campgound.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
    if(err){
      console.log("Error IN Updating Campground",err);
      res.redirect("/campgrounds")

    }else{
      console.log("CAMPGROUND UPDATED");
      req.flash("info","Campground Updated Successfully!!")
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
  //redirect to someOne
  // res.send("Hello")
})




// //DESTORY CAMPGROUND ROUTE
// router.delete("/:id",(req,res)=>{
//   Campgound.findByIdAndRemove(req.params.id,(err)=>{
//     if(err){
//       res.redirect("/campgrounds")
//     }else{
//       console.log("Campground DEL");
      
//       res.redirect("/campgrounds")
//     }
//   })
//   // res.send("This is Delete Route ")
// })


//DESTORY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
  Campgound.findByIdAndRemove(req.params.id,(err)=>{
    if(err){
      res.redirect("/campgrounds")
    }else{
      console.log("Campground DELETED");
      req.flash("error","Campground Deleted Successfully!!")
      res.redirect("/campgrounds")
    }
  })
})




// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//       return next()
//     }
//     else{
//       res.redirect("/login")
//     }
//   }

  // function checkCampgroundOwnership(req,res,next){
  //      // is user logged in
  // if(req.isAuthenticated()){
  //   Campgound.findById(req.params.id,(err,foundCampground)=>{
  //     if(err){
  //       console.log("Error in Edit Route of Campgrounds",err);
  //       res.redirect("back")
        
  //     }else{
  //          //does user own campground
  //          //console.log(req.user._id);               //5e60a033731b3d5e5b25577e
  //          //console.log(foundCampground.author.id)   //5e60a033731b3d5e5b25577e
  //         //boths value are same but foundCampgroud.author.id is an object and req.user._id is String so mongoose provides us a method called .equal() to compare object with string
  //          if(foundCampground.author.id.equals(req.user._id)){
  //           // res.render("campgrounds/edit",{campground:foundCampground})
  //           next()          
  //         }else{
  //           //  res.send("YOu dont Have permission to Do that")
  //           res.redirect("back")
             
  //          }
        
  //     }
  //   })
  // } else{
  //   // console.log("You Need to be Logged In to do that");
  //   // res.send("You Need to be Logged In to do that")
  //   res.redirect("back")
    
  // }
    
  //   //otherwise redirect
  // //if not , redirect 

  // }


  module.exports = router;