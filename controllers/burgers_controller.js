const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();
router.get("/", function (req, res) {
    burger.selectAll(function(data) {
        let hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

// Adds a new burger to the database
router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
        res.json({ id: result.insertId });
    });
});

module.exports = router;