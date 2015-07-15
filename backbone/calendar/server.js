var express = require('express');
var path = require('path');
var Bourne = require('bourne');
var app = express();
var db = new Bourne("db/events.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/events', function(req, res) {
    var b = req.body;
    console.dir(b);
    db.insert({
        title: b.title,
        date: b.date,
        startTime: b.start,
        endTime: b.end
    }, function(err, evt) {
        res.json(evt);
    });
});

app.delete('/events/:id', function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id, 10);
    db.delete({id: id}, function() {
        res.json({});
    });
});

app.get('/*', function(req, res) {
    db.find(function(err, events) {
        res.render("index.ejs", {events: JSON.stringify(events)});
    });
});



app.listen(3000);