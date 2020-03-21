const express = require('express');
const router  = express.Router();
const passport = require('passport')
const User = require('../models/user');

// ROOT ROUTE
router.get("/", (req, res) => {
    console.log(req.user);
    
    res.render("landing");
  });
 
router.get("/register",(req,res)=>{
    res.render("register")
  })
  
  router.post("/register",(req,res)=>{
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
      if(err){
        console.log("Error in Register POST ROUTE ::",err.message);
        req.flash("error", err.message)
        return res.render("register")
      
      }else{
        passport.authenticate('local')(req,res,()=>{
        req.flash("success","Welcome to YelpCamp ", user.username)
        res.redirect("/campgrounds");
        console.log("Yey Its Works In Register FORM");
        })
  
      }
    })
  })
  
  // router.get("/login",(req,res)=>{
  //   res.render("login",{message:req.flash("error")})
  // })

  router.get("/login",(req,res)=>{
    res.render("login")
  })



  router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
  }),(req,res)=>{
    res.send("LOGIN POST ROUTE HERE")
    console.log("Yey , Its LOGIN ");
    
  })
  
  
  router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Successfully you logout!")
    res.redirect("/campgrounds")
  })
  
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next()
    }
    else{
      req.flash("error","You need to be logged in to do that")
      res.redirect("/login")
    }
  }
  
  module.exports = router;