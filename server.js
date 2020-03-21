const express = require("express");
const body_parser = require("body-parser");
const PORT =process.env.PORT || 4000;
const colors = require('colors');
// const IP = process.env.IP;
const app = express();
const methodOverride = require("method-override");
const mongoose = require('mongoose')
const Campgound = require("./models/campground");
const Comment = require("./models/comment")
const SeedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user')
const flash = require('connect-flash');

//requiring routes
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const authRoutes = require("./routes/auth")

// ===================================
//        MONGOOSE CONFIGURATION
// ===================================
//mongoose.connect("mongodb://localhost/yelp_camp_for_restful_api_deployingToHeroku",{ useNewUrlParser: true ,useUnifiedTopology: true });


mongoose.connect("mongodb+srv://saeedhassan:03443239722saeed@cluster0-ctusi.mongodb.net/yelpcamp?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>{
  console.log(colors.bgGreen("server is connected successfully"));
}).catch((err)=>{
  console.log(colors.red("Error occurs in Mongoose :===>Connection",err));
})
mongoose.connection.once("open",(err)=>{
  if(err){
    console.log("Error in MONGOOSE connection",err);
  }else{
    console.log(colors.bgBlue("mongoose is connected to nodejs successfully"));
  }
})
//mongodb+srv://saeedhassan:03443239722saeed@cluster0-ctusi.mongodb.net/test?retryWrites=true&w=majority

// ===================================
//       SEEDING 
// ===================================
//SeedDB()        // we will call this when we remove all campgrounds from database otherwise we dont

// ===================================
//        EXPRESS-SESSION 
// ===================================
app.use(require('express-session')({
  secret:"Hello Iam Saeed Hassan Solangi From Dadu, Sindh , Pakistan",
  resave:false,
  saveUninitialized:false
}))

// ===================================
//        PASSPORT CONFIGURATION
// ===================================
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate(comesFrompassportLocalMongooseplugn)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ===================================
//       APP CONFIGURATION
// ===================================
app.use(express.static(__dirname+ "/public"));
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
// ===================================
//        CONNECT-FLASH CONFIGURATION
// ===================================
app.use(flash())


app.use((req,res,next)=>{
  res.locals.currentUser = req.user // by res.locals , this will add currentUser to all the templates
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  res.locals.info = req.flash("info");
  res.locals.primary = req.flash("primary")
  next()
})



// ===================================
//       MANAGING REQUIRING ROUTES
// ===================================
app.use("/campgrounds",campgroundRoutes)
app.use("/campgrounds/:id/comments",commentRoutes)
app.use("/",authRoutes)

app.listen(PORT,() =>
  console.log(colors.bgMagenta(`SERVER IS RUNNING ON THE PORT ${PORT}`))
);
