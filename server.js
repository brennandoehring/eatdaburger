const express = require("express");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(methodOverride('_method'));
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

const routes = require("./controllers/burgers_controller.js");


app.use("/", routes);

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

