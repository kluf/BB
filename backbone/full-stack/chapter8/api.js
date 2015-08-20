var restify = require('restify');
var _ = require('underscore');

var movies = require('./app/movies.json');

var server = restify.createServer({name: movies});
var DS = require('./DS.js');
var ds = new DS();
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get('/api/movies', function(req, res, next) {
    return ds.allMovies()
            .then(function(m) {res.send(m);})
            .catch(function(err) {res.send(500, err)});
    // res.send(movies);
});

server.get('/api/movies/:key', function(req, res, next) {
    return ds.find(req.params.key)
        .then(function(m) {res.send(m);})
        .error(function(err) {res.send(400, err.message)})
        .catch(function(err) {res.send(500, err)});
});

server.get('api/genres', function(req, res, next) {
    var genres = _.chain(movies)
                .map(function(movie) {
                    return movie.genres
                })
                .flatten()
                .uniq()
                .value();
    res.send(genres);
});

server.put('/api/movies/:key', function(req, res, next) {
    return ds.voteMovie(req.params.key, req.params.vote)
            .then(function(m) {res.send(m);})
            .error(function(err) {res.send(400, err.message);})
            .catch(function(err) {res.send(500, err.message);});
});

var port = 5001;
server.listen(port, function() {
    console.log("Running API server");
});