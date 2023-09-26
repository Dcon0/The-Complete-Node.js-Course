const express = require('express');
const Joi = require('joi');
const router = express.Router();

const schema = Joi.object({
    name: Joi.string().min(3).required()
})

let courses = [{ id: 1, name: 'Course One' },
{ id: 2, name: 'Course Two' }];

router.route('').get((req, res) => {
    res.send(courses);
}).post((req, res) => {
    const result = schema.validate(req.body);

    if (result.error) { res.status(400).send(result.error.details[0].message); return; }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.route('/:id').get((req, res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The requested course doesn't exist!");
    else res.send(course);
}).put((req, res) => {
    const requestedId = parseInt(req.params.id)

    const course = courses.find(item => item.id === requestedId);
    if (!course) { res.status(404).send("The requested course doesn't exist!"); return; }

    const { error } = schema.validate(req.body);
    if (error) { res.status(400).send(error.details[0].message); return; }

    course.name = req.body.name;

    res.send(course);
}).delete((req, res) => {
    const requestedId = parseInt(req.params.id)

    const course = courses.find(item => item.id === requestedId);
    if (!course) { res.status(404).send("The requested course doesn't exist!"); return; }

    courses.splice(courses.indexOf(course), 1);

    res.send(course);
})

module.exports = router;