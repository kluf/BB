var connect = require('connect');

var app = connect()
    .use(connect.logger('dev'))
    .use(function(req, res, next) {
        res.end('Hello');
    });

    app.listen(3000);