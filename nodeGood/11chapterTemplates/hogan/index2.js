var hogan = require('hogan');
var studentTemplate = '<p>Name: {{name}}, '
                + 'Age: {{age}} years old</p>';

var mainTemplate = '{{#students}}'
                + '{{>student}}'
                + '{{/students}}';

var context = {
    students: [
        {name: 'Tom', age: 19},
        {name: 'Anika', age: 19},
        {name: 'Patty', age: 18}
    ]
}

var template = hogan.compile(mainTemplate);
var partial = hogan.compile(studentTemplate);

var html = template.render(context, {student: partial});
console.log(html);