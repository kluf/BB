var connect = require('connect')
var http = require('http')
var app = connect();
var serveStatic = require('serve-static');
var fs = require('fs');
app.use(serveStatic(__dirname));

app.use('/', function(req, res){
  fs.readFile('index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});
var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(3000);

io.on('connection', function (socket) {

  socket.emit('news', { hello: 'world' });

  socket.join('default room');

  socket.on('userjoin', function(name) {
      socket.broadcast.to('default room').emit('newuser', {name: name});
  });

});
