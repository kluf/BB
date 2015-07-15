var http = require('http');
var fs = require('fs');
var join = require('path').join;
var parse = require('url').parse;
var oppressor = require('oppressor');

var root = __dirname;

var server = http.createServer(function(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    fs.stat(path, function(err, stat) {
        if (err) {
            if ('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end('404 error');
            } else {
                res.statusCode = 500;
                res.end('Internal server err');
            }
        } else {
            for (var key in stat) {
                console.log(key + ' = ' + stat.key);
            }
            res.setHeader('Content-Length', stat.size);
            var stream = fs.createReadStream(path);
            // stream.on('data', function(chunk) {
            //     res.write(chunk);
            // });
            // stream.on('end', function() {
            //     res.end();
            // });
            stream.pipe(res);
            stream.on('error', function(err) {
                res.statusCode = 500;
                res.end('Internal server error ' + err);
            });
        }
    });
});

server.listen(3000);