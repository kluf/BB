/*

curl --data "c=5&d=3" http://127.0.0.1:3000
curl http://127.0.0.1:3000
curl -X "DELETE" http://127.0.0.1:3000/1
curl -X "PUT" --data "a=3&b=7" http://127.0.0.1:3000/0

*/
var http = require('http');
var url = require('url');
var items = [];
var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk) {
                item += chunk;
                console.log('parsed ' + chunk);
            });
            req.on('end', function() {
                items.push(item);
                res.end('Parsed');
            });
            break;
        case 'GET':
            var body = items.map(function(item, i) {
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            checkForNumberWithCallback(req, res, deleteItem);
            break;
        case 'PUT':
            checkForNumberWithCallback(req, res, updateItem);
    }
});

function checkForNumberWithCallback(req, res, cb) {
    var path = url.parse(req.url).pathname;
    console.log(path);
    var i = parseInt(path.slice(1), 10);
    if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Wrong number');
    } else if (!items[i]) {
        res.statusCode = 400;
        res.end('No item');
    } else {
        cb(i, 1);
        res.end('Deleted ' + i);
    }
}

function deleteItem(i, data) {
    items.splice(i, 1);
}

function updateItem(i, data) {
    items[i] = data;
}
server.listen(3000);