var http = require('http');
var canned = require('canned');

var opts = {cors: true, logger: process.stdout};
can = canned('.', opts);

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'));
app.use(can);

app.use(function(req, res, next) {
    var delay = parseFloat(req.headers['x-delay']);
    console.log(delay);
    if (delay) {
        setTimeout(function() {
            next();
        }, delay);
    } else {
        next();
    }
})

http.createServer(app).listen(5000);