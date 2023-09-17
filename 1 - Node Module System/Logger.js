const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(`Message received: "${message}"`);
        this.emit("messageLogged", { id: 1, msg: message })
    }
}

module.exports = Logger;