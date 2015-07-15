var jade = require('jade');
var fs = require('fs');
var template = fs.readFileSync('./template.jade');
var context = {messages: ['first', 'second']};

var context1 = {obj : {
    name: 'test',
    age: 25
}}

var fn = jade.compile(template);
var fn1 = jade.compile(template);
var fn2 = jade.compile(template);
console.log(fn(context));
console.log(fn1(context));
console.log(fn2(context1));