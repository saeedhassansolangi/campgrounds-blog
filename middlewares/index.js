var Comment = require("../models/comment")
var Campgound = require("../models/campground")



// there are two ways we can do this

// //method ONE
// var middlewareObj = {
//     checkCommentOwnership:function(){

//     },
//     checkCampgroundOwnership:function(){

//     }
// }

//method TWO
 var middlewareObj ={

 }

 middlewareObj.checkUserOwnserShip = function(req,res,next){
    if(req.isAuthenticated()){
     Comment.findById(req.params.comment_id,(err,foundComment)=>{
       if(err){
         console.log("Error in Edit Route of Comment",err);
         res.redirect("back")
         
       }else{
            if(foundComment.author.id.equals(req.user._id)){
             next()          
           }else{
            req.flash("error","You don't have permission to do that")
             res.redirect("back")       
            }
       }
     })
    } else{
      req.flash("error","You need to be logged in to do that")
     res.redirect("back")
    }}

 middlewareObj.checkCampgroundOwnership = function(req,res,next){
        if(req.isAuthenticated()){
        Campgound.findById(req.params.id,(err,foundCampground)=>{
            if(err){
                // console.log("Error in Edit Route of Campgrounds",err);
                req.flash("error","Campground not Found")
                res.redirect("back") 
            }else{
                    if(foundCampground.author.id.equals(req.user._id)){
                    next()          
                    }else{
                    req.flash("error","You don't have permission to do that")
                    res.redirect("back")
                    }    
                 }
        })
        }    else{
          req.flash("error","You don't Have Permission to do that")
            res.redirect("back")
        
        }     
}


  // function checkUserOwnserShip(req,res,next){
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

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
      return next()
    }
    else{
      // step !:
      // req.flash('key',"value") //we will be using it before redirecting and now we can handle this to login route, if we put after redirect it dont works
      req.flash("error","You need to be logged in to do that")
      res.redirect("/login")
      
    }
  }


module.exports = middlewareObj