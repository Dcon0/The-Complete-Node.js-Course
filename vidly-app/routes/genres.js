const debugDB = require('debug')('vidly-app:DB');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const dbURL = config.get('mongodbURL');
debugDB('Connecting to database using URL string:', dbURL);
mongoose.connect(dbURL)
    .then(debugDB('Connected to database successfully, URL:', dbURL))
    .catch(err => debugDB('There has been an error connecting to database.', err));

const genreJoiSchema = Joi.object({
    name: Joi.string().required()
});

const genreUpdateJoiSchema = Joi.object({
    name: Joi.string()
});

const genreMongoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Genre = mongoose.model('Genre', genreMongoSchema);

router
    .get('', (req, res) => {
        debugDB('Fetching all courses');
        Genre.find()
            .then(genres => res.send(genres))
            .catch(err => res.status(500).send(err.message));
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;

        debugDB('Fetching course with id', id);
        Genre.find({ _id: id })
            .then(genres => res.send(genres))
            .catch(err => res.status(500).send(err.message));
    })
    .post('', (req, res) => {
        const valid = genreJoiSchema.validate(req.body, {
            abortEarly: false
        });

        if (valid.error) {
            debugDB(valid);

            if (req.query.details === 'true')
                res.status(400).send(valid.error.details);
            else
                res.status(400).send(valid.error.details.reduce((res, item) => {
                    if (valid.error.details.indexOf(item) <= valid.error.details.length - 3)
                        return res + item.message + ', ';
                    if (valid.error.details.indexOf(item) == valid.error.details.length - 2)
                        return res + item.message + ', and ';
                    if (valid.error.details.indexOf(item) == valid.error.details.length - 1)
                        return res + item.message + '.';
                }, ''));

            return;
        }
        const genreObject = new Genre(valid.value);
        genreObject.save()
            .then(() => {
                debugDB(genreObject, 'Successfully pushed to database.');
                res.send(genreObject);
            })
            .catch(err => {
                debugDB(genreObject, 'Failed to push to database.', err);
                res.status(500).send('Failed to push to database, ' + err);
            })
    })
    .put('/:id', (req, res) => {
        const valid = genreUpdateJoiSchema.validate(req.body, {
            abortEarly: false
        });

        if (valid.error) {
            debugDB(valid);

            if (req.query.details === 'true')
                res.status(400).send(valid.error.details);
            else
                res.status(400).send(valid.error.details.reduce((res, item) => {
                    if (valid.error.details.indexOf(item) <= valid.error.details.length - 3)
                        return res + item.message + ', ';
                    if (valid.error.details.indexOf(item) == valid.error.details.length - 2)
                        return res + item.message + ', and ';
                    if (valid.error.details.indexOf(item) == valid.error.details.length - 1)
                        return res + item.message + '.';
                }, ''));

            return;
        }

        const id = req.params.id;

        const genreObject = Genre.findByIdAndUpdate(id, {
            $set: valid.value
        }, { new: true })
            .then(result => {
                debugDB(result, 'Successfully updated object.');
                res.send(result);
            })
            .catch(err => {
                debugDB(genreObject, 'Failed to update object.', err);
                res.status(500).send('Update Failed, ' + err);
            });

    })
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        Genre.findByIdAndDelete(id)
            .then(result => {
                debugDB(result, 'Successfully deleted object.');
                res.send(result)
            })
            .catch(err => {
                debugDB('Failed to delete object.', err);
                res.status(500).send('Delete Failed, ' + err);
            });
    });

module.exports = router;