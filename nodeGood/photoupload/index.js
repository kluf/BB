var http = require('http');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST' :
            upload(req, res);
            break;
        case 'GET' :
            show(req, res);
            break;
    }
}).listen(3000);

function show(req, res) {
    var html = ''
    + '<form method="POST" action="/" enctype="multipart/form-data">'
    + '<p><input type="text" name="name"></p>'
    + '<p><input type="file" name="file"></p>'
    + '<p><input type="submit" name="Upload"></p>'
    + '</form>';
    res.setHeader('Content-type', 'text/html');
    res.setHeader('Content-length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end;
        return;
    }

    var form = new formidable.IncomingForm();
    form.parse(req);

    form.on('field', function(field, value) {
        console.log(field + '\n' + value);
    });

    form.on('file', function(name, file) {
        console.log(name + '\n' + file);
    });

    form.on('end', function() {
        res.end('upload complete');
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived/bytesExpected*100);
        console.log(percent);
    });

    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}