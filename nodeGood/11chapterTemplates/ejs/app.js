var ejs = require('ejs');
var fs = require('fs');
var http = require('http');
var filename = './template/students.ejs';

var students = [
    {name: 'Rick', age: 25},
    {name: 'Angela', age: 23},
    {name: 'Lucy', age: 21},
]
var cache = process.env.NODE_ENV === 'production';
var server  = http.createServer(function(req, res) {
    if (req.url == '/') {
        fs.readFile(filename, function(err, data) {
            var template = data.toString();
            var context = {students: students};
            var output = ejs.render(template,{students: students, cache: cache, filename: filename});
            res.setHeader('Context-type', 'text/html');
            res.end(output);
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
}).listen(3000);