const mongoose = require('mongoose');
const Joi = require('joi');

exports.genreJoiSchema = Joi.object({
    name: Joi.string().required()
});

exports.genreUpdateJoiSchema = Joi.object({
    name: Joi.string()
});

exports.genreMongoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

exports.Genre = mongoose.model('Genre', exports.genreMongoSchema);