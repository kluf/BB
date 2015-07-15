var connect = require('connect');

var api = connect()
    .use(users);
    // .use(pets)
    // .use(errorHandler);

var app = connect()
    .use(hello)
    .use('/api', api)
    // .use(errorPage)
    .listen(3000);

function hello(req, res, next) {
    if(req.url.match(/^\/hello/)) {
        res.end('hello world/n');
    } else {
        next();
    }
}

var db = {
    users: [
        {name: 'loki'},
        {name: 'tobi'},
        {name: 'jane'}
    ]
};

function users(req, res, next) {
    var userName = req.url.match(/^\/users\/(.+)/);
    if (userName) {
        console.log(db.users[userName[1]]);
        if (db.users[userName[1]]) {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(db.users[userName[1]]));
        } else {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify('error'));
        }
    }
    next();
}