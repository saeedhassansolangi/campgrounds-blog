## Comment New/Create
* Discuss nested Routes
* Add the Comment new and create routes
* Add the new COmment form

##               NEsted Routes 

first we are using route that are not depends on the other routes like now we are using comments as we know that comments are depends on the Campgrounds and each campground may has multiple comments so that's why we are using Nested Routes 

#### First we do like this 
INDEX  :  /campgroungs        GET REQUEST
NEW    :  /campgrounds/new    GET REQUEST
CREATE :  /campgrounds        POST REQUEST
SHOW   :  / campgrounds/:id   GET REQUEST


#### NOW WE ARE USING COMMENTS SO COMMENTS ARE DEPENDS ON THE CAMPGROUNDS
NEW : / campgrounds/:id/comments/new       GET REQUEST
CREATE : / campgrounds/:id/comments        POST REQUEST    


#### Adding Styling Show Page
* adding sidebar to show page 
* display comments nicely


<!-- mongodb+srv://saeedhassan:<password>@cluster0-ctusi.mongodb.net/test?retryWrites=true&w=majority -->