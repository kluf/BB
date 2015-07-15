var connect = require('connect');
var users = require('./users');
var pets = require('./pets');
var errorHandler = require('./errorHandler');
var hello = require('./hello');

var api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler).
    listen(3001);

var app = connect()
    .use(hello)
    .use('/api', api)
    // .use(errorPage)
    .listen(3000);