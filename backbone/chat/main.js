$(function() {
    var socket = io('http://localhost:3000');

    socket.on('newuser', function(obj) {
        console.log(obj);
      $('.users').append('<li>' + obj.name.name + '</li>');
    });

    socket.on('news', function(data) {
        console.log(data);
    });

    $('#addName').click(function(e) {
        e.preventDefault();
        socket.emit('userjoin', {name: $('#name').val()});
    });

});