var Backbone = require('backbone');
var ModalView = require('./modal');
var Jade = require('jade');
var Templates = require('../templates/compiledTemplates')('Handlebars');
var _ = require('underscore');
var $ = require('jquery-untouched');

var User = require('../models/user');

var JoinView = ModalView.extend({
    template: Templates['join'],
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
        this.user.signup({username: username, password: password, email: email});
    },
    initialize: function() {
        this.user = new User();
        return ModalView.prototype.initialize.call(this);
        this.listenTo(this.user, 'invalid', 'renderError');
        this.listenTo(this.user, 'signup:success', 'renderThanks');
    },
    renderError: function(error, options) {
        var errors = _.map(_.keys(err.validationError), function(key) {
            return err.validationError[key];
        });
        this.$error = text(errors);
    },
    renderThanks: function() {
        this.$el.find('.join').html('thanks for signup');
    }
});

module.exports = JoinView;