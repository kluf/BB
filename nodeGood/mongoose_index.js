var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');

var Schema = mongoose.Schema;

var Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikesheed';
task.description = 'some description';
task.save(function(err) {
    if (err) throw err;
    console.log('task is saved');
});

Task.find({'project': 'Bikesheed'}, function(err, tasks) {
    for (var i = 0; i < tasks.length; i += 1) {
        console.log('task id' + tasks[i]._id);
    }
});

// mongoose.disconnect();