var connect = require('connect');
var http = require('http');
var session = require('express-session');
var logger = require('./logger.js');
var app = connect();
var router = require('./router.js');
var routes = {
    GET: {
        '/users': function(req, res) {
            res.end('tobi, loki, ferret');
        },
        '/user/:id': function(req, res, id) {
            res.end('user' + id);
        }
    },
    DELETE: {
        '/user/:id': function(req, res, id) {
            res.end('deleted ' + id)
        }
    }
}

app.use(router(routes));
app.use('/', logger(':method :url'));
app.use(function onerror(err, req, res, next) {
    res.end(err);
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


// app.use('/', function(req, res) {
//     var sess = req.session;
//     sess.url = req.url;
//     res.end(sess.url);
// });

http.createServer(app).listen(3000)