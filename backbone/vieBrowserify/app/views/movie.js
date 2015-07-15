var $ = require('jquery-untouched');
var Backbone = require('backbone');
var _ = require('underscore');

var movieView = Backbone.View.extend({
    tagName: 'article',
    className: 'movie',
    template: '<h1><%=title%><hr></h1>',

    render: function() {
        var tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        this.$el.toggleClass('selected', this.model.get('selected'));
        return this;
    },
    initialize: function() {
        this.listenTo(this.model, 'change:title', this.render);
        this.listenTo(this.model, 'change:selected', this.render);
    },
    events: {
        'click': '_selectMovie'
    },
    _selectMovie: function(ev) {
        if (!this.model.get('selected')) {
            this.model.collection.resetSelected();
            this.model.collection.selectById(this.model.id);
        }
        ev.preventDefault();
    }
});


module.exports = movieView;