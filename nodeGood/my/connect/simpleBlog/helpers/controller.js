function usersget(req, res, next) {
    res.end('usersget');
}

function userspost(req, res, next) {
    res.end('userspost');
}

function notFould(req, res, next) {
    res.end('404 not fould');
}

var routes = {
    users: [{get: usersget}, {404: notFould}],
    404: [{404: notFould}]
}

var Controller = function() {

    this.findRoute = function(req, res, next) {
        var requestedUrl = req.url;
        var method = req.method;
        var cleanUrlPattern = /http:\/\//;
        var action = requestedUrl.toString().replace(cleanUrlPattern, '').split('/')[1].replace('/', '');
        this.getRoute(action, req, res, next);
        next();
    };

    getRoute = function(route, req, res, next) {
        var method = req.method;
        for (var i in routes) {
            routes[route].forEach(function(route) {
                for (var i in route) {
                    route[req.method.toLowerCase()](req, res, next);
                }
            });
        }
    }
}

module.exports = Controller;