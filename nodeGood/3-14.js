function asyncFunction(callback) {
    setTimeout(callback, 1);
}

var color = 'blue';


(function(color) {
    asyncFunction(function() {
        console.log('the color is ' + color);
    });
})(color);

color = 'green';