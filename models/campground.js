var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    author:{
      id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
        },
      username:String
},
    comments:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
      }
    ]
  })
  
//   var Campgound= mongoose.model("Campground",campgroundSchema);
  
module.exports = mongoose.model("Campground",campgroundSchema);