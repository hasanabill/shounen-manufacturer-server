const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("users found");
})

module.exports = router;