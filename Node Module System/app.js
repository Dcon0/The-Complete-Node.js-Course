const fsModule = require('fs');

// const files = fsModule.readdirSync(".");
// console.log(files);

fsModule.readdir("./s", (err, files) => {
    if (err) {
        console.error(`Error reading directory!, ${err}`);
    }
    if (files) {
        console.log(`Files are: ${files}`);
    }
})