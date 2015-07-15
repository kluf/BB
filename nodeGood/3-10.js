var net = require('net');

var server = net.createServer(function(socket) {
    socket.once('data', function(data) {
        console.log(data);
    });
});

server.listen(3000);