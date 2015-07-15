var Backbone = require('backbone');
var Movie = require('../models/movie');

var Movies = Backbone.Collection.extend({
    model: Movie,
    url: '/apimovies',
    beginSync: function() {
        console.log("before sync: " + Date.now());
        // $('.movies-loading').fadeIn({duration: 100});
    },
    finishSync: function() {
        console.log("after sync: " + Date.now());
        // $('.movies-loading').fadeOut({duration: 100});
    },
    delayedFetch: function(delay) {
        console.log(delay);
        return this.fetch({headers: {"X-DELAY": delay}});
    },
    initialize: function() {
        this.on('request', this.beginSync);
        this.on('sync', this.finishSync);
    },
    resetSelected: function() {
        this.each(function(model) {
          model.set({"selected": false});
        });
    },
    sortByTitle: function() {
        console.log(this.sortBy('title'));
        return this.sortBy('title');
    },
    sortByRating: function() {
        console.log('sorting by rating');
        var sorted = this.sortBy(function(m) {
            return (10 - m.get('rating'));
        });
        return sorted;
    },
    sortByShowTime: function() {
        return this.sortBy('showtime');
    },
    selectByID: function(id) {
        this.resetSelected();
        var movie = this.get(id);
        movie.set({"selected": true});
        return movie.id;
    }
});

module.exports = Movies;