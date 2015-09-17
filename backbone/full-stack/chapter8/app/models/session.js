var Backbone = require('backbone');
var User = require('./user');
var $ = require('jquery-untouched');
var _ = require('underscore');

var Session = Backbone.Model.extend({
    login: function(username, password) {
        var that = this;
        var credentials = JSON.stringify({username: username, password: password});
        console.log(credentials);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: '/api/auth/session',
            data: credentials
        }).done(function(data) {
            that.user = new User(data);
            that.trigger('login:success');
        }).fail(function(response) {
            var error = JSON.parse(response.responseText).error;
            console.log(error);
            that.validationError = {"username": error};
            that.trigger('invalid', that);
        });
    },
    logout: function() {
        var that = this;
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: 'api/auth/session'
        }).done(function() {
            that.user.set('auth', 'NOK');
            that.trigger('logout:success');
        }).fail()
    },
    currentUser: function() {
        if (this.user && (this.user.get('auth') === "OK")) {
            return this.user;
        } else {
            return false;
        }
    }
});

var session;

Session.getInstance = function() {
    if (!session) {
        session = new Session();
    }
    return session;
}

module.exports = Session;