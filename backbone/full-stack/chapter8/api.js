var restify = require('restify');
var _ = require('underscore');

var movies = require('./app/movies.json');

var server = restify.createServer({name: movies});
var DS = require('./DS.js');
var ds = new DS();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get('/api/movies', function(req, res, next) {
    console.log(req);
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

server.get('/api/genres', function(req, res, next) {
    var genres = _.chain(movies)
                .map(function(movie) {
                    return movie.genres
                })
                .flatten()
                .uniq()
                .value();
    res.send(genres);
});

server.post('/api/auth/create_user', urlencodedParser, function(req, res, next) {
    ds.createUser(req)
        .then(function(user) {
            res.send({id: user.id, username: user.username});
        })
        .error(function(err) {
            res.send(422, {error: err.message});
        })
        .catch(function(err) {
            res.send(500, {error: err.message});
        });
});

server.put('/api/movies/:key', function(req, res, next) {
    return ds.voteMovie(req.params.key, req.params.vote)
            .then(function(m) {res.send(m);})
            .error(function(err) {res.send(400, err.message);})
            .catch(function(err) {res.send(500, err.message);});
});


server.get('/api/auth/session', urlencodedParser, function(req, res, next) {
    ds.checkAuth(req)
        .then(function(user) {
            res.send({auth: "OK", id: user.id, username: user.username});
        })
        .error(function(err) {
            res.header('Set-Cookie', 'session=; HttpOnly');
            res.send(403, {auth: "NOK", error: err.message});
        })
        .catch(function(err) {
            res.header('Set-Cookie', 'session=; HttpOnly');
            res.send(403, {auth: "NOK"});
        });
});

server.del('/api/auth/session', urlencodedParser, function(req, res, next) {
    ds.clearSession(req)
        .then(function() {
            res.header('Set-Cookie', 'session=; HttpOnly');
            res.send(200, {auth: "NOK"});
        });
});

server.post('/api/auth/session', urlencodedParser, function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.send(422, {status: 'err', error: 'username and passwords are required'});
        next();
    } else {
        ds.authUser(req)
            .then(function(activeUser) {
                res.header('Set-Cookie', 'session=' + activeUser.token + '; expires=Thu, 1 Aug 2030 20:00:00 UTC ; path=/; HttpOnly');
                res.send({auth: 'OK', id: activeUser.id, username: activeUser.username, email: activeUser.email});
            })
            .error(function(error) {
                res.header('Set-Cookie', 'session=; HttpOnly');
                res.send(403, {auth: 'NOK', error: error.message});
            })
            .catch(function(err) {
                console.log('/auth/session: %', err);
                res.send(401, {auth: "NOK"});
            });
    }
});

var port = 5001;
server.listen(port, function() {
    console.log("Running API server 1");
});