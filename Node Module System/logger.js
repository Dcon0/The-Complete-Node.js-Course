function log(refEmitter, message) {
    console.log(`[logger.js] ${message}`);
    refEmitter.emit("messageLogged", { id: 1, message: message });
}

module.exports = log;