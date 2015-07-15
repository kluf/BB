var Chat = function(socket) {
    this.socket = socket;
}

Chat.prototype.sendMessage = function() {
    var message = {
        room: room,
        message: message
    }
    this.socket.emit('message', message);
}

Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', function(room) {
        newRoom: room
    });
}

Chat.prototype.processCommand = function(command) {
    var words = command.split(' ');
    var command = words[0]
                .substring(1, words[0].length)
                .toLowerCase();
    var message = false;
    switch (command) {
        case 'join':
            words.shift();
            var room = words.join(' ');
            this.changeRoom(room);
            break;
        case 'nick':
            words.shift();
            this.emit('nameAttempt', name);
            break;
        default:
            message = 'unrecognized command';
            break;
    }
    return message;
}