var db = {
    users : [
        {name: 'tobi'},
        {name: 'loki'},
        {name: 'jane'}
    ]
};

function users(req, res, next) {
    var match = req.url.match(/^\/user\/(.+)/);
    if (match) {
        var user = db.users[match[1]];
        console.log(user);
        if (user) {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            var err = new Error('User not found');
            err.notFound = true;
            next(err);
        }
    } else {
        next();
    }
}

module.exports = users;