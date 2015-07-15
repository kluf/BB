var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var title = 'test title',
    items = ['first', 'second', 'third'];

var server = http.createServer(function(req, res) {
    if ('/' == req.url) {
        switch (req.method) {
            case 'POST':
                add(req, res);
                break;
            case 'GET':
                show(res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

add = function(req, res) {
    var body = '';
    var qs = require('querystring')
    req.setEncoding = 'utf8';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function() {
        items.push(qs.parse(body).addItem);
        show(res);
    });
}

notFound = function(res) {
    res.setHeader = 404;
    res.end('notFound');
}

badRequest = function(res) {
    res.setHeader = 500;
    res.end('Internal server error');
}

show = function(res) {
    fs.readFile('./index.ejs', function(err, data) {
        if (err) {
            throw err;
        }
        var template = data.toString();
        var output = ejs.render(template, {title: title, items: items, filename: './index.ejs'});
        res.setHeader('Context-type', 'text/html');
        res.end(output);
    });
}

server.listen(3000);