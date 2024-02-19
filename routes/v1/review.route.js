const express = require("express");
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Checking review');
}).post((req, res) => {
    res.send('Adding review');
});

module.exports = router;