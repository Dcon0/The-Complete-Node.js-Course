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

async function getCourses() {
    return await Course
        .find({ author: 'Yassine', isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
}

async function displayCourses(disconnect) {
    const courses = await getCourses();

    console.log(courses);

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

async function updateCourse(id, changes, disconnect) {
    const courseAfterUpdate = await Course.findByIdAndUpdate(id, {
        $set: changes
    }, { new: true });

    console.log("Course updated:", courseAfterUpdate);

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

async function removeCourse(id, disconnect) {
    const result = await Course.deleteOne({ _id: id });

    console.log("Course removed:", result);

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

removeCourse('6519430099280879a6c051ff', true);