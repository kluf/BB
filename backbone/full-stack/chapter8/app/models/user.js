var Backbone = require('backbone');
var _ = require('underscore');

var UserModel = Backbone.Model.extend({
    defaults: {
        username: '',
        password: '',
        email: ''
    },
    urlRoot: '/api/auth/create_user',
    validate: function(attrs) {
        var errors = this.errors = {};
        if (!attrs.username) errors.firstname = 'username is required';
        if (!attrs.email) errors.email = 'email is required';
        if (!attrs.password) errors.password = 'password is required';
        if (_.isEmpty(errors)) return errors;
    },
    signup: function(attrs) {
        var that = this;
        this.save(JSON.stringify(attrs), {
            success: function(model, response) {
                console.log('success');
                that.trigger('signup:success');
            },
            error: function(model, response) {
                console.log('error');
                var error = JSON.parse(response.responseText);
                console.log(error);
                that.validationError = {"username": error};
                that.trigger('invalid', that);
            }
        });
    },
    save: function(attrs, options) {
        options || (options = {});
        options.contentType = 'application/json';
        options.data = attrs;
        return Backbone.Model.prototype.save.call(this, options);
    }
});

module.exports = UserModel;