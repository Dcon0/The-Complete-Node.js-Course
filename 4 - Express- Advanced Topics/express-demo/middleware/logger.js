function log(req, res, next) {
    console.log("Logging... " + new Date().toLocaleString());
    next();
}

module.exports = log;