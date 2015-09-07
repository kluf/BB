var Backbone = require('backbone');
var _ = require('underscore');

var MoviesList = require('./moviesList');
var DetailsView = require('./details');
var ChoseView = require('./choseView');
var Controls = require('./sort');
var Obscura = require('backbone.obscura');
var GenresViews = require('./genresViews');
var Navbar = require('./navbar');
var Layout = Backbone.View.extend({
    template: _.template('           \
             <header>              \
             <a href="#">Home</a>  \
               <nav id="controls"> \
               </nav>              \
               <span id="info">    \
               </span>             \
             </header>             \
             <div id="overview">   \
             </div>                \
             <div id="details">    \
             </div><div id="sorting"></div><nav id="session"> \
               </nav>'),
    render: function() {
        // this.$el.append(this.moviesList.render().el);
        this.$el.html(this.template());
        this.controls.setElement(this.$('#controls')).render();
        this.currentDetails.setElement(this.$('#details')).render();
        this.overview.setElement(this.$('#overview')).render();
        this.sorting.setElement(this.$('#sorting')).render();
        this.navbar.setElement(this.$('#session')).render();
        return this;
    },
    setDetails: function(movie) {
        if (this.currentDetails) this.currentDetails.remove();
        this.currentDetails = new DetailsView({model: movie});
        this.render();
    },
    setChose: function() {
        if (this.currentDetails) this.currentDetails.remove();
        this.currentDetails = new ChoseView();
        this.render();
    },
    initialize: function(options) {
        this.proxy = new Obscura(options.router.movies);
        this.overview = new MoviesList({
            collection: this.proxy,
            router: options.router
        });
        this.controls = new Controls({proxy: this.proxy});
        this.sorting = new GenresViews();
        this.currentDetails = new ChoseView();
    }
});

var instance;

Layout.getInstance = function(options) {
    if (!instance) {
        instance = new Layout({
            el: options.el,
            collection: options.router.movies,
            router: options.router
        });
        return instance;
    }
}

module.exports = Layout;