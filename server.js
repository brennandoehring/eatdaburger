const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use("/", routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

