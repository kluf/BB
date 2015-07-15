var pg = require('pg');
var conString = "postgres://admin:admin@localhost/mydb";
var http = require('http');
var db = require('./db');

http.createServer(function(req, res) {
    switch (req.method) {
        case 'GET':
            connection(req, res, 'show');
        break;
        case 'POST':
            connection(req, res, 'add');
        break;

    }

}).listen(3000);

function connection(req, res, method) {
    pg.connect(conString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        switch (method) {
            case 'show':
                db.show(req, res, client, done);
            break;
            case 'add':
                db.add(req, res, client, done);
            break;
        }
    });
}
console.log('Server with postresql is running');
