var args = process.argv;

args.forEach(function(arg) {
    switch(arg) {
        case '-h':
        case '--help':
            printHelp();
            break;
    }
});

function printHelp() {
    console.log('  usage:');
    console.log('  usage:');
    console.log('  usage:');
    console.log('  usage:');
    process.exit(0);
}


console.log(args);