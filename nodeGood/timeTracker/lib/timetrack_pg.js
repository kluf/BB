var qs = require('querystring');

exports.sendHtml = function(res, html) {
    res.setHeader('Content-type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData = function(req, cb) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        var data = qs.parse(body);
        cb(data);
    });
};

exports.actionForm = function(id, path, label) {
    var html = '<form method="POST" action="' + path + '">' +
                '<input type="hidden" name="id" value="' + id + '">' +
                '<input type="submit" value="' + label + '"></form>';
    return html;
};

exports.add = function(client, req, res) {
    exports.parseReceivedData(req, function(work) {
        client.query("insert into work(hours, date, description) values ($1, $2, $3) returning id",
            [work.hours, work.date, work.description],
            function(err, result) {
                if (err) throw err;
                exports.show(client, res);
            });
    });
};

exports.delete = function(client, req, res) {
    exports.parseReceivedData(req, function(work) {
        client.query("DELETE FROM work WHERE id = $1",
            [work.id],
            function(err) {
                if (err) throw err;
                exports.show(client, res);
            });
    });
}

exports.archive = function(client, req, res) {
    exports.parseReceivedData(req, function(work) {
        client.query("UPDATE work SET archived = 1 WHERE id = $1",
            [work.id],
            function(err) {
                if (err) throw err;
                exports.show(client, res);
            });
    });
}

exports.show = function(client, res, showArchived) {
    var query = "SELECT * FROM work " +
        "WHERE archived=$1 " +
        "ORDER BY date DESC";
    var archiveValue = (showArchived) ? 1 : 0;
    client.query(
        query,
        [archiveValue],
        function(err, rows) {
            if (err) throw err;
            html = (showArchived)
            ? ''
            : '<a href="/archived">Archived Work</a><br>';
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        });
}

exports.showArchived = function(client, res) {
    exports.show(client, res, true);
}

exports.workHitlistHtml = function(rows) {
    var html = '<table>';
    for (var i in rows) {
        html += '<tr>';
        html += '<td>' + rows[i].date + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' + rows[i].description + '</td>';
        if (!rows[i].archived) {
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

exports.workFormHtml = function() {
    var html = '<form method="POST" action="/">' +
        '<p>Date(yyyy-mm-dd):<br><input name="date" type="text"></p>' +
        '<p>Hours:<br><input name="hours" type="text"></p>' +
        '<p>Description:<br>' +
        '<textarea name="description"></textarea></p>' +
        '<input type="submit" value="ADD">' +
        '</form>';
        return html;
}

exports.workArchiveForm = function(id) {
    return exports.actionForm(id, '/archive', 'Archive');
}

exports.workDeleteForm = function(id) {
    return exports.actionForm(id, '/delete', 'Delete');
}