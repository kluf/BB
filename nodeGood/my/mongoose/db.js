var mongoose = require('mongoose');
var fs = require('fs');
var ejs = require('ejs');
var qs = require('querystring');

mongoose.connect('mongodb://127.0.0.1/bh');

var Schema = new mongoose.Schema({
    hours: Number,
    date: {type: Date, default: Date.now},
    archived: Boolean,
    description: String
});

mongoose.model('Work', Schema);

var Work = mongoose.model('Work');

exports.add = function(req, res) {
    exports.parseData(req, function(data) {
        var bad = new Work({
            hours: data.hours,
            date: data.date,
            archived: 0,
            description: data.description
        });
        bad.save(function(err) {
            if (err) throw err;
        });
        exports.show(res);
    });
}

exports.show = function(res) {
    var test = Work.find({}, function(err, works) {
        fs.readFile('index.ejs', 'utf8', function(err, data) {
            if (err) throw err;
            res.end(ejs.render(data.toString(), {works: works}));
        });
    });
}

exports.remove = function(req, res, id) {
    Work.remove({_id: id}, function(err, data) {
        console.log(data);
    });
    exports.show(res);
}

exports.showAddForm = function(req, res) {
    fs.readFile('add.ejs', 'utf8', function(err, data) {
        if (err) throw err;
        res.end(ejs.render(data));
    });
}

exports.parseData = function(req, cb) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        var body = qs.parse(data);
        cb(body);
    });
}