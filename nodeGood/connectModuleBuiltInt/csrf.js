var connect = require('connect');

var app = connect()
    .use(connect.bodyParser())
    .use(connect.cookieParser('cat'))
    .use(connect.session())
    .use(connect.csrf())
    .use(function(req, res) {
        if (req.session._csrf) {
            res.end(req.session._csrf);
        } else {
            res.end('test');
        }
    });

    app.listen(3000);