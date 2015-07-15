var requiredAge = 18;

process.stdout.write('Please enter your age');

process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data) {
    var age = parseInt(data, 10);
    if (age < requiredAge) {
        console.log('\033[32myou shoud be 18 year old\033[39m');
    } else {
        enterTheSecretDundeon();
    }
});

function enterTheSecretDundeon() {
    console.log('Enter to the programm');
}