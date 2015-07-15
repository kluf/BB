var path = url.parse(req.url).pathname;

function rewrite(req, res, next) {
    var match = path.match(/^\/blog\/posts\/(.+)/);
    if (match) {
        findPostIdBySlug(match[1], function(err, id) {
            if (err) return next(err);
            if (!id) return next(new Error('No id has been provided'));
            req.url = '/blog/posts/' + id;
            next();
        });
    } else {
        next();
    }
}