var mongo = require('mongodb');
var server = new mongo.Server('127.0.0.1', 27017, {});
var client = new mongo.Db('mydatabase', server, {w:1});

client.open(function(err) {
    if (err) throw err;
    client.collection('test_insert', function(err, collection) {
        if (err) throw err;
        collection.insert({
            'title': 'some title',
            'body': 'a lot of code goes here'
        },
        {safe: true},
        function(err, documents) {
            if (err) throw err;
            console.log(documents[0]._id + ' ' +documents[0].title);
        });

    });
});
