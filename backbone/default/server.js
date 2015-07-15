var express = require('express');
var path = require('path');
var Bourne = require('bourne');
var app = express();
var posts = new Bourne("SimpleBlogPosts.json");
var comments = new Bourne("SimpleBlogComments.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) {
    res.render("index.ejs");
});

app.listen(3000);