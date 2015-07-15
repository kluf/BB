var fs = require('fs');

var showFileContent = function(fileName) {
    fs.open(fileName, 'r', function(err) {
        if (err) throw err;
        fs.readFile(fileName, function(err, data) {
            if (err) throw err;
            return data;
        });
    });
}

module.exports = showFileContent;