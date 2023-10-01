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
//     name: "Java",
//     author: "Slaoui",
//     tags: ["Programming", "Java"],
//     isPublished: false
// });

async function getCourses(disconnect) {

    // $eq (equal)
    // $ne (not equal)
    // $gt (greater than)
    // $gte (greater than or equal)
    // $lt (lower than)
    // $lte (lower than or equal)
    // $in
    // $nin (not in)

    const courses = await Course
        .find()
        .or({ author: { $in: ['Yassine', 'Slaoui'] } },
            { date: { $gte: new Date(2023, 8, 1), $lte: new Date(2023, 8, 30) } })
        .limit(10)
        .sort({ name: 1 })
        .select({
            name: 1,
            author: 1,
            tags: 1,
            date: 1
        });

    console.log(courses);

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

getCourses(disconnect = true);