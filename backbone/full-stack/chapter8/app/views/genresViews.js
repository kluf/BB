var Backbone = require('backbone');

// The UI for selecting a Movie Category
var GenresView = Backbone.View.extend({
    template: '<ul></ul>',
    render: function() {
        var that = this;
        this.genres.forEach(function(genre) {
            that.$el.append('<label for=' + genre + '>' + genre + '<label><input type="checkbox" name='+ genre + ' value='+genre + '>');
        });
        return this;
    },
    initialize: function() {
        this.genres = ['Comedy', 'Action', 'Drama'];
    }
});

module.exports = GenresView;