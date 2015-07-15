var hogan = require('hogan');
var template = '{{message}}';
var context = {message: 'hello template hogan'};
var template = hogan.compile(template);
console.log(template.render(context));

var template1 = '{{#students}}<p>Name: {{name}},Age: {{age}} years old</p>{{/students}}';
var context1 = {
    students: [
        {name: 'Alyce', age: 25},
        {name: 'Nick', age: 22},
        {name: 'Barbara', age: 25}
    ]
}
var template1 = hogan.compile(template1);
console.log(template1.render(context1));