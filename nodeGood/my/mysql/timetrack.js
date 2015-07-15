var qs = require('querystring');
var ejs = require('ejs');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

exports.add = function(db, req, res) {
    var form = new formidable.IncomingForm();
    var filePath = path.join(__dirname, "/images");
    form.uploadDir = filePath;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        db.query("INSERT INTO work(hours, date, description) VALUES (?, ?, ?)",
        [fields.hours, fields.date, fields.description], function(err, result) {
            if (err) throw err;
            db.query("INSERT INTO pictures(work_id, name, type) VALUES (?, ?, ?)",
            [result.insertId, files.upload.path, 'filePath'], function(err, result) {
                if (err) throw err;
                exports.show(db, res);
            });
        });
    });
};

exports.showUpdateForm = function(db, req, res, id) {
    exports.parseReceivedData(req, function(work) {
        db.query("SELECT * FROM work WHERE id=?;", id, function(err, rows) {
            if (err) throw err;
            fs.readFile('addItem.ejs', 'utf8', function(err, data) {
                if (err) throw err;
                res.end(ejs.render(data, {data: rows[0]}));
            });
        });
    });
}

exports.update = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        console.log(work);
        db.query('UPDATE work set hours=?, date=?, description=? WHERE id=?',
            [work.hours, work.date, work.description, work.id],
                function(err) {
                    if (err) throw err;
                    exports.show(db, res);
                }
        );
    });
}

exports.archive = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query('UPDATE work SET archived=1 WHERE id=?', [work.id], function(err) {
            if (err) throw err;
            exports.show(db, res);
        });
    });
};

exports.delete = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query('DELETE FROM work WHERE id=?', work.id, function(err) {
            if (err) throw err;
            exports.show(db, res);
        });
    });
};

exports.deleteOrArchive = function(db, req, res, path) {
    // exports.parseReceivedData(req, function(work) {
        var id = (req.url).split('/')[2];
        var label = path === 'archive' ? 'arhive this' : 'delete this';
        console.log(label);
        fs.readFile('add.ejs', 'utf8', function(err, data) {
            if (err) throw err;
            var data = data.toString();
            var template = ejs.render(data, {id: id, label: label, path: path});
            res.end(template);
        });
    // });
};

exports.show = function(db, res, showArchived) {
    var query = "SELECT * from work inner join pictures on work.id = pictures.work_id " +
        "WHERE archived=? " +
        "ORDER BY date DESC";
        archived = (showArchived) ? 1 : 0;
    db.query(query, [archived], function(err, rows) {
        if (err) throw err;
            fs.readFile('index.ejs', 'utf8', function(err, data) {
                if (err) throw err;
                res.end(ejs.render(data, {posts: rows, err: res.error}));
            });
        });
};

exports.actionForm = function(id, path, label) {
    fs.readFile('add.ejs', function(err, data) {
        if (err) throw err;
        content = data.toString();
        var template = ejs.render(content, {id: id, path: path, label: label});
        return template;
    });
};

exports.parseReceivedData = function(req, cb) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        var data = qs.parse(body);
        console.log(data);
        cb(data);
    });
};

exports.showArchived = function(db, res) {
    exports.show(db, res, true);
};

exports.workFormHtml = function() {
    fs.readFile('addItem.ejs', function(err, data) {
        if (err) throw err;
        var content = data.toString();
        var template = ejs.render(content, {});
        return template;
    });
};

exports.workArchiveForm = function(id) {
    exports.actionForm(id, '/arhive', 'Archive');
};

exports.workDeleteForm = function(id) {
    exports.actionForm(id, '/delete', 'Delete');
};