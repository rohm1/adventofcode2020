const fs = require('fs');
const input = fs.readFileSync(process.argv[2] + '/input' + ((process.argv[3] || '') === 'test' ? '_test' : '') + '.txt').toString();

require('./' + process.argv[2] + '/run')(input);
