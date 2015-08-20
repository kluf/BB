var Backbone = require('backbone');
var Movies = require('../collections/movies');
var _ = require('underscore');

var data = require('../movies.json');
var movies = new Movies(data);

var MoviesList = require('../views/moviesList');
var Layout = require('../views/layout');

var MoviesRouter = Backbone.Router.extend({
    routes: {
        'movies/:id': 'selectMovie',
        '': 'showMain',
        'details/:key': 'showDetails'
    },
    selectMovie: function(id) {
        // this.moviesList.render();
        this.movies.resetSelected();
        this.movies.selectByID(id);
        this.layout.setDetails(this.movies.get(id));
    },
    showMain: function() {
        // this.moviesList.render();
        this.movies.resetSelected();
        this.layout.setChose();
    },
    initialize: function(options) {
        this.movies = movies;
        this.layout = Layout.getInstance({
            el: '#movies',
            router: this,
        });
        this.layout.render();
        // this.moviesList = new MoviesList({
        //     el: options.el,
        //     collection: movies,
        // });
        // _.extend(this.moviesList, {router: this});
    },
    showDetails: function(key) {
        var movie = new Movie({_key: key});
        this.listenTo(movie, 'all', function(ev) {console.log(ev)});
        movie.fetch();
    }
});

module.exports = MoviesRouter;