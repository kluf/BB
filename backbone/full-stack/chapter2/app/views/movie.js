var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var MovieView = Backbone.View.extend({
    tagName: 'article',
    className: 'movie',
    template: '<h1><%= title %><hr></h1>',
    events: {
        'click': '_selectMovie'
    },
    render: function() {
        var tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        this.$el.toggleClass('selected', this.model.get('selected'));
        return this;
    },
    _selectMovie: function(evt) {
        evt.preventDefault();
        if (!this.model.get('selected')) {
            this.model.collection.resetSelected();
            this.model.collection.selectByID(this.model.id);
        }
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    }
});

module.exports = MovieView;