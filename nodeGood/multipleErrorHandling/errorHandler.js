function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.setHeader('Content-type', 'application/json');
    if (err.notFound) {
        res.statusCode = 404;
        res.end(JSON.stringify({err: err.message}));
    } else {
        res.statusCode = 500;
        res.end(JSON.stringify({error: 'Internal Server Error'}));
    }
}

module.exports = errorHandler;