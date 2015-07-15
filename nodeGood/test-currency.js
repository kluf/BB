var currency = require('./currency');
var Currency = require('./currency_exp');

console.log(currency.canadianToUS(20));

console.log(currency.USToCanadian(30));

var cur = new Currency(50);
console.log(cur.canadianToUS(20));
console.log(cur.USToCanadian(80));