var http = require('http'),
    server = http.createServer();

    server.on('request', function(req, res) {
        res.writeHead(200, {'Content-type' : 'text/plain'});
        res.end('Hello world');
    }).listen(3000);
