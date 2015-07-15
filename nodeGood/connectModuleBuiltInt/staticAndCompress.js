var connect = require('connect');

var app = connect()
    .use(connect.compress({level: 3, memLevel: 8}))
    .use(connect.static('public'));

    app.listen(3000);