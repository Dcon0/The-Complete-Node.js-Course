const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(helmet());
if (app.get('env') === 'dev') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

app.use(home); //same as "app.use('/', home);"
app.use('/api/courses', courses);

console.log('Application Name: ' + config.get('name'));
console.log('Mail: ' + config.get('mail.host'));
console.log('Password: ' + config.get('mail.password'));

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`Listening on port ${port}...`));