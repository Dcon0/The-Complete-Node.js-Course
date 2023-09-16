const EventEmitter = require('events');
const appEmitter = new EventEmitter();
const loggerModule = require("./Logger");

appEmitter.on("messageLogged", (arg) => {
    console.log("[app.js]", arg);
})

loggerModule(appEmitter, "msgggg");