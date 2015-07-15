var jade = require('jade');
var template = 'strong #{message}';
var context = {message: 'Hello template'};

var template1 = 'a(href = url)';
var context1 = {url: 'http://google.com'};

var fn = jade.compile(template);
console.log(fn(context));

var fn = jade.compile(template1);
console.log(fn(context1));