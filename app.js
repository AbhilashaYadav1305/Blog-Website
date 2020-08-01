//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose  = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
let posts=[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//setting up DB and connecting to the new db blogDB
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true,  useFindAndModify: false,  useUnifiedTopology: true  })

//Setting a DB Schema.
const blogSchema = {
  title: String,
  content: String
};

// Compile model from schema
var Blog = mongoose.model('Blog', blogSchema );


// /posts/:postName GET route dyanamic route to create dyanamic pages on the go.
app.get('/posts/:postName', function (req, res) {


    const requestedTitle = req.params.postName;


    Blog.find({title: requestedTitle}, function (err, founditems) {

      res.render("post", {storedTitle: founditems[0].title , storedContent: founditems[0].content});

    });
});
//Rendering HOME page
app.get('/', function (req, res) {

        Blog.find({}, function(err, posts){
        res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
      });
});

//Rendering ABOUT page
app.get('/about', function (req, res) {
  res.render('about', {content : aboutContent});
});

//Rendering CONTACT page
app.get('/contact', function (req, res) {
  res.render('contact', {content : contactContent});
});

//Rendering COMPOSE page & using POST to store dynamic data.
app.route("/compose")
.get(function (req, res) {
  res.render('compose')
})
.post(function(req, res){

  let title = lodash.lowerCase(req.body.TitleText);
  let content = lodash.lowerCase(req.body.PostText);

  const post = new Blog ({
  title: title,
  content: content
  });
  post.save(function(err){
    if(!err){
      res.redirect('/');
    }
  });
});

//Listening on PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
