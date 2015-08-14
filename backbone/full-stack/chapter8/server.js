var http = require('http');
var canned = require('canned');

var opts = {cors: true, logger: process.stdout};
can = canned('.', opts);

var express = require('express');
var app = express();
var logger = require('morgan');
var url = require('url');
var proxy = require('proxy-middleware');
app.use(logger('dev',{immediate: true}));
app.use('/apimovies', proxy(url.parse("http://0.0.0.0:5001/apimovies")));
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