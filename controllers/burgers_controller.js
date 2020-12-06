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
router.post("/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function () {
        res.redirect("/");
    });
});

// Sets burger devoured status
router.put("/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    burger.updateOne({
        devoured: true
    }, condition, function (data) {
        res.redirect("/");

    });
});

module.exports = router;