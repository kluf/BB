var connect = require('connect');

//uncomment this section and comment that is below
// var app = connect()
//     .use(connect.cookieParser('test'))
//     .use(function(req, res) {
//         console.log(req.cookies);
//         console.log(req.signedCookies);
//         res.end('hello\n');
//     }).listen(3000);

var app = connect()
.use(function(req, res) {
    res.setHeader('Set-Cookie', 'foo=bar');
    res.setHeader('Set-Cookie', 'tobi=ferret;Expires=Tue, 08 Jun 2021 10:18:14 GMT');
    res.end('hello\n');
}).listen(3000);