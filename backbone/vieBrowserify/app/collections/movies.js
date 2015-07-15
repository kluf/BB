var Backbone = require('Backbone');
var Movie = require('models/movie');

var Movies = Backbone.Collection.extend({
    model: Movie
});

module.exports = Movies;