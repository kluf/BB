_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
}
var App = App || {};

var App = new Mn.Application();

App.addRegions({
    main: '#main'
});
