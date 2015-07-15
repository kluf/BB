var express = require('express');
var logger = require('morgan');
// a helper to resolve relative paths
var path = require('path');
var stitch = require('stitch');
// Then we initialize the application...
var package = stitch.createPackage({
    paths: [__dirname + '/../app'],
    dependencies: [
        __dirname + '/../libs/jquery.js',
        __dirname + '/../libs/underscore.js',
        __dirname + '/../libs/backbone.js'
    ]
})
var app = express();
app.use(express.static(__dirname + '/public'));
app.get(__dirname + '/static/bundle.js', package.createServer());

app.use(logger({ immediate: true, format: 'dev' }));
// We add a basic route that serves an index.html
// ... let's use the same as above
app.get('/', function(req, res) {
    var html = path.resolve(__dirname + '/../index.html');
    res.sendfile(html);
});
// Let's listen on port 5000
app.listen(5000);
console.log("Server is running.");