var connect = require('connect');

var app = connect()
    .use(connect.basicAuth('tobi', 'ferret'))
    .use(function(req, res) {
        res.end('Secret');
    });

    app.listen(3000);