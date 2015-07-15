var cluster = require('cluster');
var http = require('http');
var numberOfCores = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numberOfCores; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker' + worker.process.pid + ' died');
    });
} else {
    http.Server(function(req, res) {
        res.writeHead(200);
        res.end('I am process' + process.pid);
    }).listen(8000);
}