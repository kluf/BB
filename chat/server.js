var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};
var chatServer = require('./lib/chat_server');
chatServer.listen(server);

function send404(res) {
    res.writeHead(404, {'Content-type': 'text/html'});
    res.write('Error 404');
    res.end('No page found');
}

function sendFile(res, filePath, fileContent) {
    res.writeHead(200, {'Content-type': mime.lookup(filePath)});
    res.end(fileContent);
}

function serveStaticFile(res, cache, filePath) {
    if (cache[filePath]) {
        sendFile(res, filePath, cache[filePath]);
    } else {
        fs.exists(filePath, function(exists) {
            if (exists) {
                fs.readFile(filePath, function(err, data) {
                    if (err) {
                        send404(res);
                    } else {
                        cache[filePath] = data;
                        sendFile(res, filePath, data);
                    }
                });
            } else {
                send404(res);
            }
        });
    }
}

var server = http.createServer(function(req, res) {
    if (req.url == '/') {
        filePath = './public/index.html';
    } else {
        filePath = './public/' + req.url;
    }
    serveStaticFile(res, cache, filePath);
});

server.listen(3000, function(req, res) {
    console.log('server running');
});