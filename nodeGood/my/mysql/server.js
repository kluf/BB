var work = require('./timetrack');
var http = require("http");
var mysql = require('mysql');

var db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'timetrackmy'
});

function notFound(req, res) {
    res.statusCode = 404;
    res.end('Not found ' + req.url);
}

var server = http.createServer(function(req, res) {
    switch(req.method) {
        case 'POST':
            switch(req.url) {
                case '/':
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res);
                    break;
                case '/delete':
                    work.delete(db, req, res);
                    break;
                case '/update':
                    work.update(db, req, res);
                    break;
                default:
                    notFound(req, res);
            }
            break;
        case 'GET':
            var reqArr = (req.url).split('/');
            switch(req.url) {
                case '/':
                    work.show(db, res, null);
                    break;
                case '/archived':
                    work.showArchived(db, res);
                    break;
                case '/archive' + '/' + reqArr[2]:
                    work.deleteOrArchive(db, req, res, 'archive');
                    break;
                case '/delete' + '/' + reqArr[2]:
                    work.deleteOrArchive(db, req, res, 'delete');
                    break;
                case '/update' + '/' + reqArr[2]:
                    work.showUpdateForm(db, req, res, reqArr[2]);
                    break;
                default:
                    notFound(req, res);
            }
            break;
        default:
            res.statusCode = 500;
            res.end('Internal server error');
    }
});

db.query("CREATE TABLE IF NOT EXISTS pictures ( id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT, work_id INT(10) NOT NULL, name VARCHAR(60) NOT NULL, type VARCHAR(30), PRIMARY KEY(id), FOREIGN KEY (work_id) REFERENCES work(id))", function(err) {
    if (err) throw err;
});

db.query(
"CREATE TABLE IF NOT EXISTS work ("
+ "id INT(10) NOT NULL AUTO_INCREMENT, "
+ "hours DECIMAL(5,2) DEFAULT 0, "
+ "date DATE, "
+ "archived INT(1) DEFAULT 0, "
+ "description LONGTEXT,"
+ "PRIMARY KEY(id))",
    function(err) {
        if (err) throw err;
        console.log('Server started...');
        server.listen(3000, '127.0.0.1');
    }
);
