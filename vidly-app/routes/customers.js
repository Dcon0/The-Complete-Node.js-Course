const debugDB = require('debug')('vidly-app:DB');
const express = require('express');
const { Customer, customerJoiSchema, customerUpdateJoiSchema } = require('../models/customer');

const router = express.Router();

router
    .get('', async (req, res) => {
        try {
            const customers = await Customer.find().sort({ name: 1 });
            res.send(customers);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .get('/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const customer = await Customer.findById(id);
            if (!customer)
                res.status(404).send('Fetch Failed, requested id does not exist.')
            else
                res.send(customer);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })
    .post('', async (req, res) => {
        const valid = customerJoiSchema.validate(req.body, { abortEarly: false });
        if (!valid.error) {
            const customer = new Customer(valid.value);
            try {
                const result = await customer.save();
                res.send(result);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
        else {
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
        }
    })
    .put('/:id', async (req, res) => {
        const valid = customerUpdateJoiSchema.validate(req.body, { abortEarly: false });
        if (!valid.error) {
            const id = req.params.id;
            try {
                const customer = await Customer.findByIdAndUpdate(id, { $set: valid.value }, { new: true });
                if (customer)
                    res.send(customer);
                else
                    res.status(404).send('Update Failed, requested id does not exist.');
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
        else {
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
        }
    })
    .delete('/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const customer = await Customer.findByIdAndDelete(id);
            if (customer)
                res.send(customer);
            else
                res.status(404).send('Delete Failed, requested id does not exist.');
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

module.exports = router;