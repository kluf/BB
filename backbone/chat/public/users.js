App.module('User', function(User) {

    var UserModel = Backbone.Model.extend({});

    User.Collection = Backbone.Collection.extend({
        model: UserModel,
        initialize: function() {
            var thiz = this;
            App.Socket.io.on('user:join', function(user) {
                console.log('user:join');
                thiz.addUser();
            });

            App.Socket.io.on('user:leave', function(user) {
                thiz.findWhere(user).destroy();
            })
        },
        addUser: function(name, callback, context) {
            console.log('yes');
            App.Socket.io.emit('join', name, callback);
            callback.call(context, joined);
        }
    });

    var ItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'li',
        template: '#user',
        onRender: function() {
            if (this.model.get('name') === App.name) {
                this.el.className = 'highlight'
            }
        }
    });

    User.CollectionView = Backbone.Marionette.CollectionView.extend({
        tagName: 'ul',
        itemView: ItemView,
    });

    User.LogInView = Backbone.Marionette.ItemView.extend({
        tagName: 'form',
        template: '#form',
        model: new Backbone.Model({
            placeholder: 'name',
            button: 'Join'
        }),
        events: {
            'click button': 'addUser'
        },
        ui: {
            'input': 'input'
        },
        addUser: function(e) {
            e.preventDefault;
            var thiz = this;
            var name = this.ui.input.val();
            this.collection.addUser(name, function(joined) {
                if (joined) {
                    thiz.trigger('user-added');
                    App.name = name;
                } else {
                    this.ui.input.val('');
                }
            }, this);
            return false;
        }
    });

});