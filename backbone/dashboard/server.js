var express = require('express');
var path = require('path');
var Bourne = require('bourne');
var app = express();
var posts = new Bourne("SimpleBlogPosts.json");
var comments = new Bourne("SimpleBlogComments.json");
var db = new Bourne("db/events.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/events/:id', function(req, res) {
    db.find({id: parseInt(req.params.id, 10)}, function(err, event) {
        res.json(event);
    });
});

app.put('/events/:id', function(req, res) {
    var e = {
        title: req.body.title,
        details: req.body.details,
        date: req.body.date
    };
    db.update({id: parseInt(req.params.id, 10)}, e, function(err, e) {
        res.json(e);
    });
});

app.get('/events', function(req, res) {
    db.find(function(err, events) {
        res.json(events);
    });
});

app.post('/events', function(req, res) {
    var attrs = {
        title: req.body.title,
        details: req.body.details,
        date: req.body.date,
        createOn: new Date()
    };
    db.insert(attrs, function(err, event) {
        res.json(event);
    });
});

app.delete('/events/:id', function(req, res) {
    db.delete({id: parseInt(req.params.id, 10)}, function() {
        res.json({});
    });
});

app.get('/*', function(req, res) {
    db.find(function(err, events) {
        res.render("index.ejs", {
            events: JSON.stringify(events)
        });
    });
});

app.listen(3000);