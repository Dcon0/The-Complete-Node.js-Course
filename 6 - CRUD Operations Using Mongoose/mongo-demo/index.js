const config = require('config');
const debugDB = require('debug')('app:debugDB');
const mongoose = require('mongoose');

console.log('Debug Mode: ' + process.env.DEBUG);

mongoose.connect(config.get('mongodbURL'))
    .then(() => debugDB('Connected to "' + config.get('mongodbURL') + '" Successfully'))
    .catch(error => debugDB("Couldn't connect to MongoDB,", error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function pushCourse(course) {
    try {
        const courseDBObject = new Course(course);
        const saveResult = await courseDBObject.save();
        console.log(saveResult);
    } catch (error) {
        console.error(error);
    }
}

// pushCourse({
//     name: 'Node.js Course',
//     author: 'Yassine',
//     tags: ['node', 'backend'],
//     isPublished: true
// })

// pushCourse({
//     name: 'Angular Course',
//     author: 'Yassine',
//     tags: ['angular', 'frontend'],
//     isPublished: true
// })

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

getCourses();

// mongoose.disconnect().then(res => console.log("Disconnected from DB successfully.", res));