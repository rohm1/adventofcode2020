const fs = require('fs');
const input = fs.readFileSync(process.argv[2] + '/input' + ((process.argv[3] || '') === 'test' ? '_test' : '') + '.txt').toString();

const start = process.hrtime();
require('./' + process.argv[2] + '/run')(input);
let time = process.hrtime(start);
console.log('Time: ', (1000 * time[0] + Math.floor(time[1] / 1000000)) + 'ms');
