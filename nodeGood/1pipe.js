var http = require('http'),
    fs = require('fs');

    http.createServer(function(req, res) {
        res.writeHead(200, {'Content-type' : 'image/jpg'});
        fs.createReadStream('./buttons.jpg').pipe(res);
    }).listen(3000);

    console.log('App is running');