const http = require("http");

const port = 3000
const server = http.createServer((req, res) => {
    console.log("New connection!");
    // console.log("Request:\n", req);
    console.log("Request URL:", req.url);
    if (req.url === "/") {
        res.write("Hello");
        res.end(", World!");
    }
    if (req.url === '/api/courses')
        res.end(JSON.stringify([1, 2, 3, 4, 5]));
});
server.listen(port);

console.log("Listening on port", port + "...");