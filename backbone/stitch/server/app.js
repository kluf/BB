var express = require('express');
var logger = require('morgan');
var stitch = require('stitch');
var path = require('path');

var package = stitch.createPackage({
    paths: [__dirname + '/../app/'],
    dependencies: [
        __dirname + '/../node_modules/jquery/src/jquery.js',
        __dirname + '/../node_modules/underscore/underscore.js',
        __dirname + '/../node_modules/backbone/backbone.js',
    ]
});

console.log(package.paths);

var app = express();

app.get('/static/bundle.js', package.createServer());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(5000);

console.log('server running');