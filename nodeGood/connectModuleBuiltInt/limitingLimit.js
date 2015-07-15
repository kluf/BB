function type(type, fn) {
    return function(req, res, next) {
        var ct = req.headers['content-type'] || '';
        if (0 != ct.indexOf(type)) {
            return next();
        }
        fn(req, res, next);
    }
}
var connect = require('connect');

var app = connect()
    .use(type('application/x-www-form-urlencoded', connect.limit('64kb')))
    .use(type('application/json', connect.limit('32kb')))
    .use(type('image', connect.limit('2mb')))
    .use(connect.bodyParser());

app.listen(3000);
