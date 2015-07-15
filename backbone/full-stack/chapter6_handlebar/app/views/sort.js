var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;

var SortView = Backbone.View.extend({
    template: _.template('  \
                 <p>Sort:</p> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
                 <a id="prev">prev</a>&nbsp<a id="next">Next</a>'),
    events: {
        'click #by_title': 'sortByTitle',
        'click #by_rating': 'sortByRating',
        'click #by_showtime': 'sortByShowTime',
        'change select[name="genre"]': 'selectGenre',
        'click a#next': 'nextPage',
        'click a#prev': 'prevPage',
    },
    sortByRating: function() {
        this.superset.setSort("rating", "asc");
    },
    sortByTitle: function() {
        this.superset.setSort("title", "desc");
    },
    sortByShowTime: function() {
        this.superset.setSort("showtime", "asc");
    },
    initialize: function(options) {
        this.movies = this.collection;
        this.superset = options.proxy;
        this.superset.setPerPage(3);
    },
    nextPage: function(ev) {
        ev.preventDefault();
        this.superset.nextPage();
    },
    prevPage: function(ev) {
        ev.preventDefault();
        this.superset.prevPage();
    },
    selectGenre: function(ev) {
        var genre1 = $('select[name="genre"]').val();
        console.log(genre1);
        if (genre1 == "all") {
            this.superset.removeTransforms();
        } else {
            this.superset.removeTransforms();
            this.superset.filterBy('selected genre', {genre: genre1});
        }
    },
    filterByCategory: function(genre) {
        var filtered = this.movies.filter(function(m) {
            return (_.indexOf(m.get('genres'), genre) !== -1)
        });
        this.collection.reset(filtered);
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

module.exports = SortView;