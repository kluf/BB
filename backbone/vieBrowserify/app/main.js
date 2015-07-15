/*---------this code worked----------*/
// var Backbone = require('backbone');
// var $ = require('jquery-untouched');
// Backbone.$ = $;
// var Movies = require('collections/movies');
// var data = require('../movies.json');
// var movies = new Movies(data);
// var Monitor = require('./monitor');
// var monitor = new Monitor(movies);
// var MovieView = require('./views/movie');
// var MoviesList = require('./views/MoviesList');
// module.exports = {movies: movies, MovieView: MovieView, MoviesList: MoviesList};
/*-------------------*/
// module.exports = function() {return Backbone;};
var MoviewRouter = require('routers/movies');
var Backbone = require('backbone');
var $ = require('jquery-untouched');
Backbone.$ = $;
$(document).ready(function() {
    console.log('init app...');
    var router = new MoviesRouter({el: $('#movies')});
    Backbone.history.start({
        pushState: true,
        root: '/'
    });
});