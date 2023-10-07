const debugLog = require('debug')('vidly-app:debugLog');

function log(req, res, next) {
    debugLog('[Logging', new Date().toLocaleString() + ']', 'URL:', req.url, '| Method:', req.method);
    next();
}

module.exports = log;