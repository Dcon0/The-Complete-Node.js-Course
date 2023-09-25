const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');

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

//RestAPI routes have to be set/written after setting the other middlewares using 'app.use()', otherwise,
//throughout the request pipeline, going sequentially through middlewares/routes(get/post/put/delete HTTP verbs), the routes will use 
//"res.send()" and not "next()", thereby sending a response to the user and not going through the rest of the middlewares using the "next()" method
app.use('/api/courses', courses);

console.log('Application Name: ' + config.get('name'));
console.log('Mail: ' + config.get('mail.host'));
console.log('Password: ' + config.get('mail.password'));

app.get('/', (req, res) => {
    res.render('index', {
        title: "Express Demo App",
        message: 'Hello'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`Listening on port ${port}...`));