const http = require("http");

const port = 3000
const server = http.createServer();
server.listen(port);
server.on("connection", (socket) => {
    console.log("New connection!");
});

console.log("Listening on port", port + "...");