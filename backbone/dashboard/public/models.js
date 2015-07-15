var Event = Backbone.Model.extend({
    defaults: {
        title: '',
        details: '',
        date: ''
    }
});

var Events = Backbone.Collection.extend({
    model: Event,
    url: '/events',
    comparator: 'date',
    initialize: function(models, options) {
        this.wait = (options && options.wait) || 10000;
    },
    refresh: function() {
        this.fetch();
        setTimeout(this.refresh.bind(this), this.wait);
    },
    reverse: function(options) {
        this.sort({silent: true});
        this.models = this.models.reverse();
        this.trigger('sort', this, options);
    },
});