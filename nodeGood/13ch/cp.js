var cp = require('child_process');

room.on('message', function(user, message) {
    if (message[0] == '.') {
        var command = message.substring(1);
        cp.exec(command, {timeout: 15000}, function(err, stdout, stderr) {
            if (err) {
                room.say('Error executing');
            };
            room.say(stderr);
        });
    } else {
        room.say('Command completed ' + command);
        room.say(stdout);
    }
})