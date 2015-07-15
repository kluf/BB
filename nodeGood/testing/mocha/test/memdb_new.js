var memdb = require('..');
var assert = require('assert');

describe('memdb', function() {
    beforeEach(function() {
        memdb.clear();
    });

    describe('.save(doc)', function() {
        it('should save the document', function() {
            var pet = {name: 'Tobi'};
            memdb.save(pet);
            var ret = memdb.first({name: 'Tobi'});
            assert(ret == pet);
        });
    });

    describe('.saveAsync(doc, cb)', function(done) {
        it('should save the document', function() {
            var pet = {name: 'Tobi'};
            memdb.saveAsync(pet, function() {
                var ret = memdb.first({name: 'Tobi'});
                assert(ret == pet);
                done();
            });
        });
    });

    describe('.first(obj)', function() {
        it('should return the first matching document', function() {
            var tobi = {name: 'Tobi'},
                loki = {name: 'Loki'};
            memdb.save(tobi);
            memdb.save(loki);
            var ret = memdb.first({name: 'Tobi'});
            assert(ret == tobi);
            var ret = memdb.first({name: 'Loki'});
            assert(ret == loki);
        });

        it('should return null when no documents match', function() {
            var ret = memdb.first({name: 'Manny'});
            assert(ret == null);
        });
    });
});

