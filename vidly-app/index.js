const debugStartup = require('debug')('vidly-app:startup');
debugStartup('App started with environment:', process.env.NODE_ENV);

const express = require('express');
const morgan = require('morgan');

const logger = require('./middleware/logger');
const home = require('./routes/home');
const genres = require('./routes/genres');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'dev') {
    app.use(morgan('tiny'));
    debugStartup('Morgan enabled');
}

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static('public'));


app.use(home);
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => debugStartup(`Listening on port ${port}...`));