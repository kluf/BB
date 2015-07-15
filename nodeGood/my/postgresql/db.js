var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');

exports.show = function(req, res, client, done) {
    client.query('SELECT * FROM work1', function(err, result) {
        done();
        if (err) throw err;
        fs.readFile('index.ejs', 'utf8', function(err, data) {
            if (err) throw err;
            res.end(ejs.render(data, {posts: result.rows, err: ''}));
        });
        return result;
    });
};

exports.add = function(req, res, client, done) {
    var data = exports.parseIncomingData(req);
    console.log(data);
    client.query('INSERT INTO work1(hours, date, archived, description) VALUES($1, $2, $3, $4) returning id',
    [data.hours, data.date, 0, data.description], function(err, result) {
        if (err) throw err;
        console.log(result.rows[0].id);
        done();
        exports.show(req, res, client, done)
    });
};

exports.parseIncomingData = function(req) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        console.log(chunk);
        body += chunk;
    });
    req.on('end', function(chunk) {
        return qs.parse(body);
    });
}