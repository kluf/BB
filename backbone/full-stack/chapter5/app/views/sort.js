var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;

var SortView = Backbone.View.extend({
    template: _.template('  \
                 <p>Sort:</p> \
                 <button id="by_title">By Title</button>  \
                 <button id="by_rating">By Rating</button>\
                 <button id="by_showtime">By Showtime</button> \
                 <p>Filter</p> \
                 <select name="genre"> \
                   <option value="all"> \
                     All \
                   </option> \
                   <option value="Drama"> \
                     Drama \
                   </option> \
                   <option value="Action"> \
                     Action \
                   </option> \
                 </select>'),
    events: {
        'click #by_title': 'sortByTitle',
        'click #by_rating': 'sortByRating',
        'click #by_showtime': 'sortByShowTime',
        'change select[name="genre"]': 'selectGenre'
    },
    sortByRating: function() {
        console.log('rat');
        this.movies.reset(this.movies.sortByRating());
    },
    sortByTitle: function() {
        this.movies.reset(this.movies.sortByTitle());
    },
    sortByShowTime: function() {
        this.movies.reset(this.movies.sortByShowTime());
    },
    initialize: function(options) {
        this.movies = this.collection;
        this.superset = options.superset
    },
    selectGenre: function(ev) {
        var genre = $('select[name="genre"]').val();
        var that = this;
        if (genre == "all") {
            that.collection.reset(that.superset.toJSON());
        } else {
            that.collection.reset(that.superset.toJSON());
            this.filterByCategory(genre);
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