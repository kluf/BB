var connect = require('connect');

var app = connect()
    .use('/files', connect.directory('public', {icons: true, hidden: true}))
    .use('/files', connect.static('public', {hidden: true}));

    app.listen(3000);