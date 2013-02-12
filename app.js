var express = require('express');
var app = express();
var engines = require('consolidate');

// I like QEJS. :-)
app.engine('html', engines.qejs);
app.set('view engine', 'qejs');

// Serve static assets.
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/accommodation/', function (req, res) {
    res.render('accommodation.html');
});

app.listen(3000);