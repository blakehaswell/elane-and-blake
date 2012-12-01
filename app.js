var express = require("express");
var app = express();

// I like EJS. :-)
app.set("view engine", "ejs");

// Serve static assets.
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("index");
});

app.listen(3000);