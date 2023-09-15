const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged', (arg) => {
    console.log("This is callback inside loggerModule: ", arg);
});

module.exports = emitter;

console.log("inside logger");