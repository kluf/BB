var connect = require('connect');
var http = require('http');
var db = require('./helpers/db');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var app = connect();
var localization = require('./helpers/localization');
var loc = new localization('ua', null);
var Controller = require('./helpers/controller');
var controller = new Controller();
// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());
app.use(connect.static(path.join(__dirname, '/public')));
// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use('/', controller.findRoute);

// app.use('/post/new', function(req, res, next) {
//     fs.readFile('./view/index.ejs', 'utf8', function(err, data) {
//         var dataToProcess = data.toString();
//         res.end(ejs.render(dataToProcess, {title: loc.get('titleAddPost'), page: 'newpost', filename: 'view/menu', filename: 'view/footer',
//                 filename: 'view/newPost'}));
//     });
// });

// app.use('/users/add', function(req, res, next) {
//     fs.readFile('./view/index.ejs', 'utf8', function(err, data) {
//         var dataToProcess = data.toString();
//         res.end(ejs.render(dataToProcess, {title: loc.get('titleAddUser'), page: 'newpost', filename: 'view/menu', filename: 'view/footer',
//                 filename: 'view/newPost'}));
//     });
// });

// respond to all requests
// app.use('/', function(req, res, next) {
//     console.log(req.method);
//     fs.readFile('./view/index.ejs', 'utf8', function(err, data) {
//         var dataToProcess = data.toString();
//         res.end(ejs.render(dataToProcess, {title: loc.get('titleIndex'), page: '', filename: 'view/menu', filename: 'view/footer'}));
//     });
// });

//create node.js http server and listen on port
http.createServer(app).listen(3000);
console.log('================\nServer started on port 3000\n================');