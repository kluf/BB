_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
function tmpl(selector) {
  return _.template($(selector).html());
}

var NavView = Backbone.View.extend({
    el: '#navbar',
    events: {
        'click a#addPodcast': 'addPodcast'
    },
    addPodcast: function(e) {
        e.preventDefault();
        Backbone.history.navigate('/podcasts/new', {trigger: true});
        return false;
    }
});

var PodcastListView = Backbone.View.extend({
    className: 'list-group',
    initialize: function(options) {
        this.current = options.current || null;
        this.listenTo(this.collection, 'add', this.render);
    },
    render: function() {
        if (this.collection.length === 0) {
            this.el.innerHTML = '<a class="list-group-item">No podsasts</a>';
            return this;
        }
        this.el.innerHTML = '';
        this.collection.forEach(this.renderItem, this);
        return this;
    },
    renderItem: function(model) {
        model.set({current: this.current === model.get('id')});
        var v = new PodcastListItemView({model: model});
        this.el.appendChild(v.render().el);
    }
});

var PodcastListItemView = Backbone.View.extend({
    tagName: 'a',
    className: 'list-group-item',
    template: tmpl('#podcastItem'),
    initialize: function() {
        this.model.episodes().on('count', this.displayCount, this);
    },
    events: {
        'click': 'displayEpisodes'
    },
    render: function() {
        this.el.innerHTML = this.template(this.model.toJSON());
        this.el.href = this.model.url();
        this.$el.addClass(this.model.get('current') ? 'active': '');
        this.displayCount();
        return this;
    },
    displayCount: function(evt) {
        var eps = this.model.episodes();
        eps.fetch().done(function() {
            var count = eps.pluck('listened')
                .filter(function(u) {
                    return !u;
                }).length;
            this.$('.badge').text(count);
        }.bind(this));
    },
    displayEpisodes: function(evt) {
        evt.preventDefault();
        Backbone.history.navigate(this.model.url(), {trigger: true});
        return false;
    }
});

var NewPodcastView = Backbone.View.extend({
    className: 'list-group-item',
    template: tmpl('#newPodcast'),
    events: {
        'click button': 'addPodcast',
    },
    addPodcast: function(evt) {
        evt.preventDefault();
        var feed = this.$el.find('input').val();
        console.log(feed);
        this.$el.addClass('loading').text('Loading podcast...');
        this.collection.create({feed: feed}, {
            wait: true,
            success: this.remove.bind(this)
        })
        Backbone.history.navigate('/');
        return false;
    },
    render: function() {
        this.el.innerHTML = this.template();
        return this;
    }
})