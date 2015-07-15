function hello(req, res, next) {
    if (req.url.match(/^\/hello/)) {
        res.setHeader('Content-type', 'text/plain');
        res.end('Hello world');
    } else {
        next();
    }
}

module.exports = hello;