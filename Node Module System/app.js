const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged', (arg) => {
    console.log(arg);
});

emitter.emit('messageLogged', { id: 1, name: "Yassine" })