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

// Sets burger devoured status
router.put("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Delete a burger from the database
router.delete("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;