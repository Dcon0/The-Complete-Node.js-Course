const config = require('config');
const debugDB = require('debug')('app:debugDB');
const mongoose = require('mongoose');

console.log('Debug Mode: ' + process.env.DEBUG);

mongoose.connect(config.get('mongodbURL'))
    .then(() => debugDB('Connected to "' + config.get('mongodbURL') + '" Successfully'))
    .catch(error => debugDB("Couldn't connect to MongoDB,", error));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
        // match: /pattern/,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'desktop', 'network'],
        lowercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: (value) => {
                if (!value) return false;
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const result = value.length > 0;
                        resolve(result);
                    }, 2000);
                })
            },
            message: 'A course should have at least one tag!'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 250,
        get: value => Math.round(value),
        set: value => Math.round(value)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function pushCourse(courseJSON, disconnect) {
    try {
        const courseDBObject = new Course(courseJSON);
        const saveResult = await courseDBObject.save();
        console.log(saveResult);
    } catch (error) {
        console.error(error.message);
    }

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

pushCourse({
    name: 'Java Programming',
    author: 'Yassine',
    tags: ['java', 'programming'],
    isPublished: true,
    category: 'desktop',
    price: 15.8
}, true);

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
    const deletedCourse = await Course.findByIdAndDelete({ _id: id });

    console.log("Course removed:", deletedCourse);

    if (disconnect)
        mongoose.disconnect().then(console.log("Disconnected from DB successfully."));
}

async function validateCourse(courseJSON, silent) {
    try {
        const courseDBObject = new Course(courseJSON);
        const validationResult = await courseDBObject.validate();
        if (!silent) console.log('Course object is valid.');
        if (!validationResult) return true;
    }
    catch (error) {
        if (!silent) {
            let i = 0;
            for (field in error.errors) {
                i++;
                console.error('Validation Error ' + i + ':', error.errors[field].message);
                console.error('======================================');
            }
        };
        return false;
    }
}