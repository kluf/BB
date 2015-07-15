var connect = require('connect');

var sessionOpts = {
    key: 'myadd_sid',
    cookie: {maxAge : 3600000 * 24}
}

var app = connect()
    .use(connect.favicon())
    .use(connect.cookieParser('keyboard cat'))
    .use(connect.session(sessionOpts))
    .use(function(req, res, next){
        var sess = req.session;
        if (sess.views) {
            res.setHeader('Content-type', 'text/html');
            res.write('<p>views: ' + sess.views + '</p>');
            res.write('<p>expires in: ' + sess.cookie.maxAge/1000 + '</p>');
            res.write('<p>httpOnly: ' + sess.cookie.httpOnly + '</p>');
            res.write('<p>path: ' + sess.cookie.path + '</p>');
            res.write('<p>domain: ' + sess.cookie.domain + '</p>');
            res.write('<p>secure: ' + sess.cookie.secure + '</p>');
            res.end();
            sess.views ++;
        } else {
            sess.views = 1;
            res.end('Welcome to the session demo. refresh!');
        }
    });

    app.listen(3000);