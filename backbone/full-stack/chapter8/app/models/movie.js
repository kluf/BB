var Backbone = require('backbone');

var Movie = Backbone.Model.extend({
    url: '/movies',
    idAttribute: '_key',
    toShowTimeDate: function() {
        var d = new Date(0);
        d.setUTCSeconds(this.get('showtime'));
        return d;
    },
    showtimeToString: function() {
        return this.toShowTimeDate().toLocaleString();
    },
    defaults: {
        title: 'default',
        year: 0,
        description: "empty",
        selected: false
    },
    voteMovie: function(stars) {
        var that = this;
        this.save({
            type: 'PUT',
            url: '/movies/'+this.id,
            contentType: 'application/json',
            data: JSON.stringify({vote: stars})
        })
        .then(function(movie) {
            that.set({rating: stars, score: movie.score, rank: movie.rank});
        })
        .fail(function(err) {
            console.log(err);
        });
    }
});

module.exports = Movie;