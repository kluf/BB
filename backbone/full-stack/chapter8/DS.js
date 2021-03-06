var fs = require('fs');
var _ = require('underscore');
var sha1 = require('sha1');

var Promise = require('bluebird');
var Users = [];

Promise.promisifyAll(fs);

var Movies = fs.readFileAsync("./app/movies.json", 'utf8')
                .then(JSON.parse);

function _mapAttributes(movie) {
    return {
        id: movie.id,
        title: movie.title,
        _key: sha1(movie.title)
    }
}

function _mapAllAttributes(movie) {
    return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        showTime: movie.showTime,
        rating: movie.rating,
        genres: movie.genres,
        _key: sha1(movie.title)
    }
}

function _find(movies, key) {
    var match = _.find(movies, function(movie) {
        return sha1(movie.title) === key;
    });
    if (!match) {
        throw Promise.RejectionError('no id');
    } else {
        return match;
    }
}

var DS = function() {}

DS.prototype.allMovies = function() {
    return Movies.map(_mapAttributes);
}

DS.prototype.find = function(key) {
    return Movies.then(function(movies) {
        return _find(movies, key);
    });
}

DS.prototype.voteExist = function(id, voter) {
    console.log('duplicates', id);
}

DS.prototype.addVote = function(vote, key, voter) {
    Movies.then(function(movies) {
        var match = _.find(movies, function(movie) {return sha1(movie.title) === key});
        if (!match) {
            throw new Promise.RejectionError("ID not found");
        } else {
            match.rating += 1;
            console.log(match);
            return match;
        }
    });
}

DS.prototype.computeScore = function(key, score) {
    console.log('score = ' + score);
}

DS.prototype.updatedScore = function(key, score) {
    console.log('score for ' + key);
}

DS.prototype.voteMovie = function(id, vote, voter) {
    var that = this;
    return Movies.then(function() {
        return that.voteExist(id, 0);
    })
    .then(function(result) {
        return that.addVote(vote, id, voter);
    })
    .then(function() {
        return that.computeScore(id);
    })
    .then(function() {
        return that.updatedScore(id, score);
    })
    .then(function() {
        return that.showMovie(id);
    });
}

function _createUser(raw) {
    if (JSON.parse(raw.body.data).username) {
        var userId = Users.length + 1;
        var newUser = {
            id: userId,
            username: JSON.parse(raw.body.data).username,
            password: JSON.parse(raw.body.data).password,
            email: JSON.parse(raw.body.data).email
        }
        Users.push(newUser);
        console.log(Users);
        return _returnUser(newUser);
    }
}

function _returnUser(newUser) {
    return _.pick(newUser, 'username', 'id');
}

function _findByUsername(username) {
    var user = _.findWhere(Users, {username: username});
    return Promise.delay(30).return(user);
}

function getCookies(request) {
    console.dir(request.headers);
    var cookies = {};
    if (request.headers && request.headers.cookie) {
        request.headers.cookie.split(';').forEach(function(cookie) {
            var parts = request.headers.cookie.match(/(.*?)=(.*?)/);
            console.dir(parts);
            cookies[parts[1].trim()] = (parts[2] || '').trim();
        });
    }
    return cookies;
}

function _findByUserToken(req) {
    var cookies = getCookies(req);
    var user = _.findWhere(Users, {token: cookies.session});
    return Promise.delay(30).return(user);
}



function _checkDuplicates(raw) {
    var username = JSON.parse(raw.body.data).username;
    return _findByUsername(username).then(function(existingUser) {
        if (existingUser) {
            return Promise.reject('username taken');
        }
        return raw;
    });
}

function _matchPasswords(req) {
    console.log(req.body.username);
    return _findByUsername(req.body.username).then(function(activeUser) {
        if (activeUser && req.body.password === activeUser.password) {
            return activeUser;
        } else {
            console.log('no user found');
            return Promise.reject('username not found');
        }
    });
}

function _generateToken(activeUser) {
    var token = sha1(_.now().toString());
    activeUser.token = token;
    return activeUser;
}


DS.prototype.createUser = function(req) {
    return _checkDuplicates(req).then(_createUser);
}

DS.prototype.authUser = function(req) {
    return _matchPasswords(req).then(_generateToken);
}

DS.prototype.checkAuth = function(req) {
    return _findByUserToken(req).then(function(activeUser) {
        if (!activeUser) {
            return Promise.Reject("No session");
        }
        return _returnUser(activeUser);
    });
}

DS.prototype.clearSession = function(req) {
    return _findByUserToken(req).then(function(activeUser) {
        if (activeUser) {
            activeUser.auth = null;
        }
        return activeUser
    });
}

module.exports = DS;
// {"username":"vova2d","password":"asdf"}
//curl -H "Content-Type: application/json" -d "{"username":"vova","password":"asdf"}" 127.0.0.1:5001/api/auth/create_user