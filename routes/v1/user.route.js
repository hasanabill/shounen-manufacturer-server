const express = require("express");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");
const router = express.Router();


router.route("/:email").get(viewCount, limiter, (req, res) => {
    res.send("users found");
}).patch((req, res) => {
    res.send("user updated");
})

module.exports = router;