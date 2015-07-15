var ansi = require('ansi');
var cursor = ansi(process.stdout);

cursor
    .reset()
    .write(' ')
    .bold()
    .underline()
    .bg.white()
    .fg.green()
    .write('hello')
    .fg.reset()
    .bg.reset()
    .resetUnderline()
    .resetBold()
    .write('\n')
    .fg.cyan()
    .write(' by:\n')
    .fg.red()
    .write('bla\n');