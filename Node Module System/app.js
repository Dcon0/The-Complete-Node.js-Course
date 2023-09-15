const EventEmitter = require('events');
const emitter = new EventEmitter();
const loggerModule = require("./logger");

loggerModule.emit('messageLogged', { id: 1, name: "Yassine" })