var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var MoviesRouter = require('./routes/movies');

$(document).ready(function() {
    console.log('init app');
    var router = new MoviesRouter({
        el: $('#movies')
    });
    Backbone.history.start({pushState: true, root: '/'});
});