var fs = require('fs');
var _ = require('underscore');
var sha1 = require('sha1');

var Promise = require('bluebird');

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

module.exports = DS;