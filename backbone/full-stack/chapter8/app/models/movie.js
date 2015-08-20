var Backbone = require('backbone');

var Movie = Backbone.Model.extend({
    url: '/movies',
    idAttribute: '_key',
    toShowTimeDate: function() {
        var d = new Date(0);
        d.setUTCSeconds(this.get('showtime'));
        return d;
    },
    showtimeToString: function() {
        return this.toShowTimeDate().toLocaleString();
    },
    defaults: {
        title: 'default',
        year: 0,
        description: "empty",
        selected: false
    }
});

module.exports = Movie;