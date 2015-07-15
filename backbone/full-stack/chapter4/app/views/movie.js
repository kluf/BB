var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var MovieView = Backbone.View.extend({
    tagName: 'article',
    className: 'movie',
    template: '<h1><a href="/movies/<%= id %>"><%= title %></a><hr></h1>',
    events: {
        'click a': '_selectMovie'
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
            this.router.navigate(this.model.url + '/' + this.model.id, {trigger: true});
        }
    },
    initialize: function(options) {
        this.listenTo(this.model, 'change', this.render);
        this.router = options.router;
    }
});

module.exports = MovieView;