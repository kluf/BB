App.module('Router', function(Router) {


    var Router = Marionette.AppRouter.extend({
        users: new App.User.Collection(),
        controller: myController,
        initialize: function() {
            App.layout = new App.Layout.Layout();
            App.main.show(App.layout);
        },
        appRoutes: {
            '': 'index'
        },
    });

    var myController = {
        index: function() {
            var users = new App.User.Collection();
            App.layout.getRegion('users').show(new App.User.CollectionView({
                collection: users
            }));
            var loginView = new App.User.LogInView({
                collection: users
            });
            App.layout.getRegion('controls').show(loginView);
        }
    };

    var r = new Router({
        controller: myController,
    });

    // App.on('initialize:after', function () {
        // if (Backbone.history) {
            Backbone.history.start({pushState: true});
        // }
    // });

    App.start();

});
