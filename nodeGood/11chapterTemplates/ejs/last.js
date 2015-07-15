var ejs = require('ejs');

var tempalte = '<%=: movies | first | upcase |  truncate:20 %>';
var tempalte1 = '<%=: movies | sort |  first %>';
var tempalte2 = "<%=: movies | sort_by:'name' | first | get:'name' %>";
var tempalte3 = "<%=: movies | map:'name' | sort | first %>";
var customTepmlate = "<%=: price * 1.145 | round:2 %>"
var context = {'movies' : [
    'some wonderful text that should be very long as you see',
    'anotehr',
    'some other'
]}

var context1 = {'movies' : [
    {name: 'aaome wonderful text that should be very long as you see'},
    {name: 'anotehr'},
    {name: 'some other'}
]}

ejs.filters.round = function(number, decimalPlaces) {
    decimalPlaces = !decimalPlaces ? 0 : decimalPlaces;
    var multiple = Math.pow(10, decimalPlaces);
    return Math.round(number * multiple) / multiple;
}

var contextForCustom = {'price': [2,3,5]};
console.log(ejs.render(tempalte, context));
console.log(ejs.render(tempalte1, context));
console.log(ejs.render(tempalte2, context1));
console.log(ejs.render(tempalte3, context1));
console.log(ejs.render(customTepmlate, contextForCustom));