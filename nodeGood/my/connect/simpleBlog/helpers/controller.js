function usersget(req, res, next) {
    res.end('usersget');
}

var routes = {
    'users': [{get: usersget}],
    '404': ['404']
}

var Controller = function() {
    this.findRoute = function(req, res, next) {
        var requestedUrl = req.url;
        var method = req.method;
        var cleanUrlPattern = /http:\/\//;
        var action = requestedUrl.toString().replace(cleanUrlPattern, '').split('/')[1];
        console.log('action = ' + requestedUrl.toString());
        for (var i in routes) {
            // console.log(i + ' - ' + action);
            if (action == i) {
                switch (method) {
                    case 'POST':
                        break;
                    case 'GET':
                        this.getRoute(routes[i].get(req, res, next);
                        break;
                    case 'UPDATE':
                        break;
                    case 'DELETE':
                        break;
                    default:
                }
            } else {

            }
        }
        next();
    }
    this.getRoute = function(route, req, res, next) {
        for
    }
}

module.exports = Controller;