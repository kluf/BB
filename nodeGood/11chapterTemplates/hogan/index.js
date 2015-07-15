var hogan = require('hogan');
var md = require('marked');

var template = '{{#markdown}}'
            + '**Name**: {{name}}'
            + '{{/markdown}}';

var context = {
    name: 'Rick Larue',
    markdown: function() {
        return function(text) {
            return md.parse(text);
        }
    }
}

var template = hogan.compile(template);
console.log(template.render(context));