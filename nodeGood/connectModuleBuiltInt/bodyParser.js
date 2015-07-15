var connect = require('connect');

// var app = connect()
//     .use(connect.bodyParser())
//     .use(function(req, res) {
//         req.end(req.body.username);
//     });

var app = connect()
    .use(connect.bodyParser())
    .use(function(req, res) {
        console.log(req.body);
        console.log(req.files);
        res.end('Thanks !');
    });

app.listen(3000);
