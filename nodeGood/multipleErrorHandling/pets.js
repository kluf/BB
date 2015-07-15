var db = {
    pets : [
        {
        name: 'tobi',
        name: 'loki',
        name: 'jane'
        }
    ]
}

function pets(req, res, next) {
    var match = req.url.match(/^\/pet\/(.+)/);
    if (match) {
        var pet = db.pets[match[1]];
        if (pet) {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(pet));
        } else {
            var err = new Error('pet not found');
            err.notFound = true;
            next(err);
        }
    } else {
        next();
    }
}

module.exports = pets;