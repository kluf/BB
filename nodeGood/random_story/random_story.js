var fs = require('fs'),
    request = require('request'),
    htmlparser = require('htmlparser'),
    configFilename = './rss_feeds.txt';

    function checkForRssFile() {
        console.log('1');
        fs.exists(configFilename, function(exists) {
            if (!exists) return next(new Error('Missing rss file'));
        next(null, configFilename);
        });
    }

    function readRssFile(configFilename) {
        console.log('2');
        fs.readFile(configFilename, function(err, feedList) {
            if (err) return next(err);
            feedList = feedList
                        .toString()
                        .replace(/^\s+|\s+$/g, '')
                        .split('\n');
            var random = Math.floor(Math.random() * feedList.length);
            next(null, feedList[random]);
        });
    }

    function downloadRSSFeed(feedUrl) {
        console.log('3');
        request({uri: feedUrl}, function(err, res, body) {
            if (err) return next(err);
            if (res.statusCode != 200)
                return next(new Error('Abnormal response status code'));
            next(null, body);
        });
    }

    function parseRssFeed(rss) {
        console.log('4');
        var handler = new htmlparser.RssHandler();
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(rss);

        if (!handler.dom.items.length)
            return next(new Error('No rss feed'));
        var item = handler.dom.items.shift();
        console.log(item.title);
        console.log(item.link);
    }

    var tasks = [
        checkForRssFile,
        readRssFile,
        downloadRSSFeed,
        parseRssFeed
    ]

    function next(err, result) {
        if (err) throw err;
        var currentTask = tasks.shift();
        if(currentTask) {
            currentTask(result);
        }
    }

    next();