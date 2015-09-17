var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);

var SortView = Backbone.View.extend({
    template: Templates["app/templates/genres"],
    events: {
        'click #by_title': 'sortByTitle',
        'click #by_rating': 'sortByRating',
        'click #by_showtime': 'sortByShowTime',
        'change select[name="genre"]': 'selectGenre',
        'click a#next': 'nextPage',
        'click a#prev': 'prevPage',
        'click ul input': 'selectGenre'
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
        this.genres = ['Comedy', 'Action', 'Drama'];
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
        var genre = ev.currentTarget.name;
        if (!genre) {
            this.superset.resetFilters();
        } else {
            this.superset.resetFilters();
            this.superset.filterBy('genres', function(model) {
                console.log(model.get('genres'));
                return model.get('genres') == genre;
            });
        }
    },
    filterByCategory: function(genre) {
        var filtered = this.movies.filter(function(m) {
            return (_.indexOf(m.get('genres'), genre) !== -1)
        });
        this.collection.reset(filtered);
    },
    render: function() {
        this.$el.html(this.template({genres: this.genres}));
        return this;
    }
});

module.exports = SortView;