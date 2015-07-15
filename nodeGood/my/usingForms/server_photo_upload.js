var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
    if ('/' == req.url) {
        switch (req.method) {
            case 'POST':
                upload(req, res);
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

upload = function(req, res) {
    if (!isFormData(req)) {
        request400(res);
    }
    var form = new formidable.IncomingForm();
    form.uploadDir = "./photo";
    form.keepExtensions = true;
    form.on('progress', function(bytesReceived, bytesExpected) {
        var currentProgress = (bytesReceived / bytesExpected *100 );
        console.log(currentProgress);
        res.write('uploaded ' + currentProgress);
    });
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end('uploaded');
    });
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

notFound = function(res) {
    res.setHeader = 404;
    res.end('notFound');
}

request400 = function(res) {
    res.setHeader = 400;
    res.end('multipart form-data is');
}

badRequest = function(res) {
    res.setHeader = 500;
    res.end('Internal server error');
}

show = function(res) {
    fs.readFile('photo.ejs', function(err, data) {
        if (err) throw err;
        var content = data.toString();
        var template = ejs.render(content, {title: 'some title'});
        res.setHeader('Context-type', 'text/html');
        res.setHeader('Content-length', Buffer.byteLength(template));
        res.end(template);
    });
}

server.listen(3000);