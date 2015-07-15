var redis = require("redis");
var net = require('net');


var server = net.createServer(function(socket) {
    var subscriber = redis.createClient(),
        publisher = redis.createClient();

    socket.on('connect', function() {
        subscriber.on('subscribe', function(channel, count) {

        });

        subscriber.on('message', function(channel, message) {
            console.log('Channel: ' + channel + ' says ' + message);
        });
    });

    socket.on('data', function(data) {
        var channel = 'publisher_channel'
        publisher.publish(channel, data);
        subscriber.subscribe(channel);
    });

}).listen(8124);
