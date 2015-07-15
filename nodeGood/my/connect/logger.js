function setup(format) {
    var regexp = /:(\w+)/g;
    return function logger(req, res, next) {
        var str = format.replace(regexp, function(match, property) {
            return req[property];
        });
        next();
    }
}

module.exports = setup;