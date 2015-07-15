var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/simpleBlogWithConnect');

var Post = mongoose.model('Post', {
    title: String,
    date: { type: Date, default: Date.now },
    author: String,
    text: String,
    comments: [{ body: String, date: Date }],
});

exports.save = function() {
    return function(req, res, next) {
        var post = new Post();
    }
}