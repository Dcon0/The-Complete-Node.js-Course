const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const schema = Joi.object({
    name: Joi.string().min(3).required()
})

let courses = [{ id: 1, name: 'Course One' },
{ id: 2, name: 'Course Two' }];

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id));
    //404 - Resource Not Found
    if (!course) res.status(404).send("The requested course doesn't exist!");
    else res.send(course);
})

app.post('/api/courses', (req, res) => {
    const result = schema.validate(req.body);

    if (result.error) { res.status(400).send(result.error.details[0].message); return; }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    const requestedId = parseInt(req.params.id)

    const course = courses.find(item => item.id === requestedId);
    if (!course) { res.status(404).send("The requested course doesn't exist!"); return; }

    const { error } = schema.validate(req.body);
    if (error) { res.status(400).send(error.details[0].message); return; }

    course.name = req.body.name;

    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const requestedId = parseInt(req.params.id)

    const course = courses.find(item => item.id === requestedId);
    if (!course) { res.status(404).send("The requested course doesn't exist!"); return; }

    courses.splice(courses.indexOf(course), 1);

    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`Listening on port ${port}...`));