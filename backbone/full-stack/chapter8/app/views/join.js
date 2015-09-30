var Backbone = require('backbone');
var ModalView = require('./modal');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var _ = require('underscore');
var $ = require('jquery-untouched');

var User = require('../models/user');

var JoinView = ModalView.extend({
    template: Templates["app/templates/join"],
    events: {
        'submit': 'registerUser'
    },
    render: function() {
        ModalView.prototype.render.call(this);
        this.delegateEvents();
        return this;
    },
    registerUser: function(ev) {
        ev.preventDefault();
        this.user.clear();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var email = $('input[name="email"]').val();
        var that = this;
        this.user.signup({username: username, password: password, email: email});
    },
    initialize: function() {
        this.user = new User();
        this.listenTo(this.user, 'all', function(ev) { console.log(ev) });
        this.listenTo(this.user, 'invalid', this.renderError);
        this.listenTo(this.user, 'signup:success', this.renderThanks);
        return ModalView.prototype.initialize.call(this);
    },
    renderError: function(error, options) {
        var errors = _.map(_.keys(error.validationError), function(key) {
            return error.validationError[key];
        });
        this.$('.error').text(errors);
        this.$error.addClass('error-active');
    },
    renderThanks: function() {
        this.$el.find('.join').html('thanks for signup');
    }
});

module.exports = JoinView;