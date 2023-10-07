const mongoose = require('mongoose');
const Joi = require('joi');

exports.customerJoiSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phone: Joi.number(),
    isGold: Joi.boolean().default(false)
});

exports.customerUpdateJoiSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.number(),
    isGold: Joi.boolean().default(false)
});

exports.customerMongoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        sparse: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

exports.Customer = mongoose.model('Customer', exports.customerMongoSchema);