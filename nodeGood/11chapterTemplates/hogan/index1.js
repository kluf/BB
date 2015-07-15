var hogan = require('hogan');
var md = require('marked');

var template = '{{_markdown}}'
            + '**Name**: {{name}}'
            + '{{/markdown}}';

var context = {
    name: 'Rick Larue',
    _markdown: function() {
        return function(text) {
            return md.parse(text);
        }
    }
}

var template = hogan.compile(template, {sectionTags: [{o: '_markdown', c: 'markdown'}]});
console.log(template.render(context));