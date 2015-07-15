var http = require('http');
var work = require('./lib/timetrack');
var pg = require('pg');

var conString = "tcp://postgres:1234@localhost:5432/mydb";
var client = new pg.Client(conString);
client.connect();

var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'POST' :
            switch (req.url) {
                case '/' :
                    work.add(client, req, res);
                    break;
                case '/archive' :
                    work.archive(client, req, res);
                    break;
                case '/delete' :
                    work.delete(client, req, res);
                    break;
            }
            break;
        case 'GET' :
            switch (req.url) {
                case '/' :
                    work.show(client, res);
                    break;
                case '/archived' :
                    work.showArchived(client, res);
                    break;
            }
    break;
    }
});
server.listen(3000, '127.0.0.1')
// client.query(
// "CREATE TABLE IF NOT EXISTS work ("
// + "id INT(10) NOT NULL AUTO_INCREMENT, "
// + "hours DECIMAL(5,2) DEFAULT 0, "
// + "date DATE, "
// + "archived INT(1) DEFAULT 0, "
// + "description LONGTEXT"
//     // function(err) {
//     //     if (err) throw err;
//     //         console.log('Server started...');
//     //         server.listen(3000, '127.0.0.1');
//     // }
// );