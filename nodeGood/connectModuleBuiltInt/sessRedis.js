var connect = require('connect');
var RedisStore = require('connect-redis')(connect);

var app = connect()
    .use(connect.favicon())
    .use(connect.cookieParser('keyboardcat'))
    .use(connect.session({store: new RedisStore({prefix: 'sid'})}));

    app.listen(3000);