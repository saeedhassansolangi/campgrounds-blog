const express = require("express");
const router  = express.Router({mergeParams:true});
const Campgound = require("../models/campground");
const Comment  = require('../models/comment');
const middlware = require("../middlewares")


router.get("/new",middlware.isLoggedIn,(req,res)=>{
    Campgound.findById(req.params.id,(err, foundCampground)=>{
      if(err){
        console.log("Oops there is an Error in Get Comment");
        
      }else{
        res.render("comments/new",{campground:foundCampground})
  
      }
    })
    
  })
  
  
  router.post("/",middlware.isLoggedIn,(req,res)=>{ 
    Campgound.findById(req.params.id,(err,campground)=>{
      if(err){
        console.log("Error occurs in POST COmment");
        res.redirect("/campgrounds")
      }else{
        Comment.create(req.body.comment,(err,comment)=>{
          if(err){
            req.flash("error","Something Went Wrong!!!")
            console.log("Error In POST COMMENT");
            
          }else{
            // add username and id to comment 
            comment.author.id = req.user._id,
            comment.author.username = req.user.username
            //save comment
            comment.save()
            console.log("new comment user will be ",req.user.username) //this will work only when you add comment 
            campground.comments.push(comment);
            console.log(comment);
            campground.save((err,campgroundss)=>{
              if(err){
                req.flash("error","Something Went Wrong!!!")

                console.log("Again Error");
                
              }else{
                req.flash("success","Successfully added Comment!!!")
                res.redirect('/campgrounds/'+campgroundss._id)
                
              }
            })
            
            
          }
        })
  
  
      }
    }) 
  })

//COMMENT EDIT ROUTE
 router.get("/:comment_id/edit",middlware.checkUserOwnserShip,(req,res)=>{
  //  res.send("EdiT COmmnet")
      Comment.findById(req.params.comment_id,(err,founcComment)=>{
        if(err){
            res.redirect("back")
        }else{
          console.log(founcComment);
          
          res.render("comments/edit",{campground_id:req.params.id,comment:founcComment})
 

        }
      })
      }) 
//COMMENT UPDATE ROUTE
router.put("/:comment_id",middlware.checkUserOwnserShip,(req,res)=>{
  // res.send("You hit the Update Route")
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
    // console.log(req.params.id);
    
    if(err){
      res.redirect("back")
    }else{
      // console.log("Iam Back",updatedComment);   
      req.flash("info","Comment Updated Successfully!!")

      res.redirect("/campgrounds/"+ req.params.id)
    }
  })
})


//COMMENT DESTORY ROUTE
router.delete("/:comment_id",middlware.checkUserOwnserShip,(req,res)=>{
  // res.send("you hit the delete button")
  Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
    if(err){
      res.redirect("back")
    }else{
      req.flash("success","Comment deleted Successfully!!")
      res.redirect("/campgrounds/"+req.params.id)
    }
  })
})








  // function isLoggedIn(req,res,next){
  //   if(req.isAuthenticated()){
  //     return next()
  //   }
  //   else{
  //     res.redirect("/login")
  //   }
  // }


// function checkUserOwnserShip(req,res,next){
//     // is user logged in
// if(req.isAuthenticated()){
//  Comment.findById(req.params.comment_id,(err,foundComment)=>{
//    if(err){
//      console.log("Error in Edit Route of Comment",err);
//      res.redirect("back")
     
//    }else{
//         //does user own campground
//         //console.log(req.user._id);               //5e60a033731b3d5e5b25577e
//         //console.log(foundCampground.author.id)   //5e60a033731b3d5e5b25577e
//        //boths value are same but foundCampgroud.author.id is an object and req.user._id is String so mongoose provides us a method called .equal() to compare object with string
//         if(foundComment.author.id.equals(req.user._id)){
//          // res.render("campgrounds/edit",{campground:foundCampground})
//          next()          
//        }else{
//          //  res.send("YOu dont Have permission to Do that")
//          res.redirect("back")
          
//         }
     
//    }
//  })
// } else{
//  // console.log("You Need to be Logged In to do that");
//  // res.send("You Need to be Logged In to do that")
//  res.redirect("back")
 
// }
 
//  //otherwise redirect
// //if not , redirect 

// }


  module.exports = router