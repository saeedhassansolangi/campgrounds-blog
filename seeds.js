var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//We here are doing Three stuff
// * removing all campgrounds from the Database
// * adding a few campgrounds for startup
// * adding a few comments fro startup

//Campgrounds for Inital Setup
var campgroundData = [
  {
    name: "Acorn Oaks Campground",
    image:
      "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c7d2c79dc974bc25b_340.png",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
  },
  {
    name: "Atwood Lake Campground",
    image:
      "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c7d2c79dc974bc25b_340.jpg",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
  },
  {
    name: "Brown County KOA",
    image:
      "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c7d2c79dc974bc25b_340.jpg",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
  },
];

// Removing all campgrounds from the database
function SeedDB() {
  Campground.remove({}, (err) => {
    if (err) {
      /// commentfromthisifyouremvoebutdontwanttoaddinUser+comment
      console.log("Error Occurs In Campground Seed File");
    } else {
      console.log("Campgrounds are Removed");
      //adding a few Campground for startup
      campgroundData.forEach((seed) => {
        Campground.create(seed, (err, campgroundd) => {
          if (err) {
            console.log("Error in Adding new campgroundd in Seed");
          } else {
            console.log("Campgrounds are Added");

            //adding a few Comments
            Comment.create(
              {
                text: "This place is Great",
                author: "Saeed Hassan",
              },
              (err, comment) => {
                if (err) {
                  console.log("Error in Adding a Comment in Seed");
                } else {
                  console.log("Comments are Added");
                  campgroundd.comments.push(comment);
                  campgroundd.save();
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = SeedDB;
