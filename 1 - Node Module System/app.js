const Logger = require("./Logger");

emitter = new Logger();
emitter.on("messageLogged", (arg) => {
    console.log("\"messageLogged\" event received", arg);
})

emitter.log("Test Message");