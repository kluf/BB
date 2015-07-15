module.exports = Backbone.View.extend({
    tagName: 'ul',
    render: function() {
        this.el.innerHTML = 'bla';
        return this;
    }
});