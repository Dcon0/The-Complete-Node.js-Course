const config = require('config');
const debugDB = require('debug')('app:debugDB');
const mongoose = require('mongoose');

mongoose.connect(config.get('mongodbURL'))
    .then(() => debugDB('Connected to "' + config.get('mongodbURL') + '" Successfully'))
    .catch(error => debugDB("Couldn't connect to MongoDB,", error));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    // date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find()
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/ }
        ])
        .and({ isPublished: true });
}

async function showCourses(disconnect) {
    const courses = await getCourses();

    console.log(courses);

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

showCourses(true);