App.module('Layout', function(Layout, App) {

    Layout.Layout = Backbone.Marionette.LayoutView.extend({
        template: '#appLayout',
        regions: {
            users: '#users',
            rooms: '#rooms',
            conversation: '#conversation',
            controls: '#controls'
        }
    });

});