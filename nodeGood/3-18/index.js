var fs = require('fs'),
    completedTasks = 0,
    tasks = [],
    wordCounts = {},
    fileDir = './text';

    function checkIfComplete() {
        completedTasks ++;
        if (completedTasks == tasks.length) {
            for (var index in wordCounts) {
                console.log(index + ': ' + wordCounts[index]);
            }
        }
    }

    function countWordsInText(text) {
        var words = text
            .toString()
            .toLowerCase()
            .split(/\W+/)
            .sort();
        for (var index in words) {
            var word = words[index];
            if(word) {
                wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
            }
        }
    }

    fs.readdir(fileDir, function(err, files) {
        if (err) throw err;
        for(var index in files) {
            var task = (function(file) {
                return function() {
                    fs.readFile(file, function(err, data) {
                        if (err) throw err;
                        countWordsInText(data);
                        checkIfComplete();
                    });
                }
            })(fileDir + '/' + files[index]);
            tasks.push(task);
        }
        for (var task in tasks) {
            tasks[task]();
        }
    });