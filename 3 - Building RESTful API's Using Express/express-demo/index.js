const express = require('express');
const app = express();

app.use(express.json());

const courses = [{ id: 1, name: 'Course One' },
{ id: 2, name: 'Course Two' }];

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.post('/api/courses', (req, res) => {
    //400 - Bad Request
    if (!req.body.name) {
        res.status(400).send("Expected name attribute!");
        return;
    }
    else if (req.body.name.length < 3) {
        res.status(400).send("Name too short, name should not be shorter than 3 characters!");
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((item) => {
        return item.id == req.params.id;
    })
    //404 - Resource Not Exist
    if (!course) res.status(404).send("The requested course doesn't exist!");
    else res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`Listening on port ${port}...`));