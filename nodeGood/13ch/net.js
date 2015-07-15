var net = require('net');

net.createServer(function(socket) {
    console.log('socket connected!');
    socket.on('data', function(data) {
        console.log('data = ', data);
    });
    socket.on('end', function() {
        console.log('end event occured');
    });
    socket.on('close', function() {
        console.log('close event occured');
    });
    socket.on('error', function(error) {
        console.log('error = ', error);
    });
    socket.pipe(socket);
}).listen(1337);