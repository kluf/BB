var Backbone = require('backbone');
var _ = require('underscore');
var $ = Backbone.$;

var LoginView = require('./login');
var JoinView = require('./join');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var Session = require('../models/session');

var NavbarView = Backbone.View.extend({
    template: Templates["app/templates/navbar"],
    initialize: function() {
        _.bindAll(this, 'render', 'login', 'join', 'logout');
        this.session = Session.getInstance();
        this.loginView = new LoginView();
        this.joinView = new JoinView();
        this.listenTo(this.session, 'login:success', this.render);
        this.listenTo(this.session, 'logout:success', this.render);
    },
    render: function() {
        console.log(this.template);
        var session = this.session.currentUser();
        this.$el.html(this.template({session: session}));
        if (session) {
            this.$el.delegate('.logout', 'click', this.logout);
        } else {
            this.$el.delegate('.login', 'click', this.login);
            this.$el.delegate('.join', 'click', this.join);
        }
        return this;
    },
    login: function(ev) {
        ev.preventDefault();
        $('body').append(this.loginView.render().el);
    },
    join: function(ev) {
        ev.preventDefault();
        $('body').append(this.joinView.render().el);
    },
    logout: function(ev) {
        ev.preventDefault();
        this.session.logout();
    }
});

module.exports = NavbarView;