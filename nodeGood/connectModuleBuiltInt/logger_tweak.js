var fs = require('fs');
var connect = require('connect');
var log = fs.createWriteStream('./myapp.log', {flags : 'a'});


var app = connect()
    .use(connect.favicon('F:/Other/icons/computer.ico'))
    .use(connect.logger({format: ':method :url', stream: log}))
    .use(function(req, res, next) {
        res.end('Hello');
    });

    app.listen(3000);