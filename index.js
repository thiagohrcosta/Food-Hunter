const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json({type: 'application/json'}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(express.static(__dirname + "public"));

app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/js/owl'))

app.use(express.static(__dirname + '/style'));

app.use(express.static(__dirname + '/style/owl'));

mongoose.connect("mongodb+srv://admin-app:123456app@movieapi.z0kfu.mongodb.net/restaurantdb", 
{  useNewUrlParser: true,
  useUnifiedTopology: true});

const postSchema = {
  name: String,
  description: String,
  image: String,
  stars: String,
  type: String,
  speciality: String,
  price: Number,
  latitude: Number,
  longitude: Number,
  address: String,
  opening_hours: String,
  opening_weekends: Boolean,
  //imagePlace: [String],
}

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  res.render("Home")
})

app.get("/restaurants", function(req, res){

  Post.find({}, function(err, posts){
    res.render("Restaurants", {
      posts: posts,
    });
  })
})


app.post("/restaurants", function(req, res){
  const post = new Post({
    name: req.body.restaurantName,
    description: req.body.restaurantDescription,
    image: req.body.restaurantPhoto,
    stars: req.body.restaurantStars,
    speciality: req.body.restaurantSpeciality,
    price: req.body.restaurantPrice,
    address: req.body.restaurantAddress,
    opening_hours: req.body.restaurantOpening,    
    //imagePlace: req.body.restaurantImagePlace,
  });

  post.save(function(err){
    if(!err){
      res.redirect("/restaurants")
    }
  })
});

app.get("/restaurants/:id", function(req, res){
  const requestedPostId = req.params.id;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("RestaurantContent", {
      name: post.name,
      description: post.description,
      image: post.image,
      //imagePlace: post.imagePlace,
      stars: post.stars,
      speciality: post.speciality,
      price: post.price,
      address: post.address,
      opening_hours: post.opening_hours,  
    })
  })

});

app.get("/addRestaurants", function(req, res){
  res.render("AddRestaurant")
})



app.listen(3000, function(req, res){
  console.log("Server running on port 3000.")
})