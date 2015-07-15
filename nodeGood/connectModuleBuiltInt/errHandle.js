var connect = require('connect');

var app = connect()
    .use(connect.logger('dev'))
    .use(function(req, res, next) {
        setTimeout(function() {
            next(new Error('something is broken'));
        }, 500);
    })
    .use(connect.errorHandler());

    app.listen(3000);