const express = require('express');
const app = express();

const courses = [{ id: 1, name: 'Course One' },
{ id: 2, name: 'Course Two' }];

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((item) => {
        return item.id == req.params.id;
    })
    if (course === undefined)
        res.send("The requested course doesn't exist!");
    res.send(`You requested course id ${req.params.id}:
    ${JSON.stringify(course)}`);
})

const port = process.env.PORT || 3000;
app.listen(port, "127.0.0.1", () => console.log(`Listening on port ${port}...`));