const osModule = require('os');

console.log(`My machine's total memory is: ${osModule.totalmem()} Bytes
Free Memory: ${osModule.freemem()} Bytes`);