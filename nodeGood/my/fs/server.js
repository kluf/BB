var http = require('http');
var fo = require('./module/files_opener');

http.createServer(function(req, res) {
    if (req.url = '/') {
        var a = fo('./module/index.html', res);
        // res.writeHead(200, {'Content-type': 'text/html'});
        // res.write(typeof(a));
        // res.end();
    }
}).listen(3000);
console.log('Server is running on port 3000');