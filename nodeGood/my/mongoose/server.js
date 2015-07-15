var db = require('./db.js');

var http = require('http');
http.createServer(function(req, res) {
    var reqArr = (req.url).split('/');
    switch(req.method) {
        case 'GET':
            switch(req.url) {
                case '/':
                    db.show(res);
                break;
                case '/add':
                    db.showAddForm(req, res);
                break;
                case '/delete/'+ reqArr[2]:
                    db.remove(req, res, reqArr[2]);
                break;
            }
        break;
        case 'POST':
            db.add(req, res);
        break;
    }
}).listen(3000);
console.log('Running on 3000');