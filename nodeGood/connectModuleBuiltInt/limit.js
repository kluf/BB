var connect = require('connect');

var app = connect()
    .use(connect.limit(1))
    .use(connect.bodyParser())
    .use(function(req, res) {
        console.log(req.body);
    });

app.listen(3000);