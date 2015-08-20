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

DS.prototype.voteExist = function(id, voter) {
    console.log('duplicates', id);
}

DS.prototype.addVote = function(vote, key, voter) {
    console.log('vote for ' + key);
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
module.exports = DS;