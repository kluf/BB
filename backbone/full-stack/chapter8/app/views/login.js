var ModalView = require('./modal');
var Backbone = require('backbone');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var $ = require('jquery-untouched');
var _ = require('underscore');

var Session = require('../models/session');

var LoginView = ModalView.extend({
    template: Templates["app/templates/login"],
    events: {
        'submit': 'login'
    },
    render: function() {
        ModalView.prototype.render.call(this);
        this.delegateEvents();
        this.$error = this.$el.find('.error');
        return this;
    },
    login: function(ev) {
        ev.preventDefault();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var that = this;
        Session.getInstance().login(username, password);
    },
    initialize: function() {
        this.session = Session.getInstance();
        this.listenTo(this.session, 'login:success', this.closeModal);
        return ModalView.prototype.initialize.call(this);
    }
});

module.exports = LoginView;