const fsModule = require('fs');

const files = fsModule.readdirSync(".");
console.log(files);