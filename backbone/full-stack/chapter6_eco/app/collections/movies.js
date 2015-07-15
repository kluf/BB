var Backbone = require('backbone');
var Movie = require('../models/movie');

var Movies = Backbone.Collection.extend({
    model: Movie,
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