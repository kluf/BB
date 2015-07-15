var express = require('express');
var path = require('path');
var Bourne = require('bourne');

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var users = {};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res) {
    res.render("index.ejs");
});

function userExists(name) {
    for (var i in users) {
        return users.i === name;
    }
}

io.on('connection', function(socket) {
    socket.on('join', function(name, response) {
        if (userExists(name)) {
            response(false);
        } else {
            response(true);
            users[socket.id] = {name: name};
            socket.emit('user:join', {name: name});
        }
    });
    Object.keys(users).forEach(function(id) {
        socket.emit('user:join', users[id]);
    });

    socket.on('disconnect', function() {
        if (users[socket.id]) {
            io.sockets.emit('user:leave', users[socket.id]);
            delete users[socket.id];
        }
    });

});



server.listen(3000);