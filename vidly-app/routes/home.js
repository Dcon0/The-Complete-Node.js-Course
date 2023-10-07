const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Vidly App Project",
        header: "Welcome",
        message: 'This is the home page of the Vidly App Project'
    })
})

module.exports = router;