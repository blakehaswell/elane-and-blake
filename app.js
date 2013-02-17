var express = require('express');
var app = express();
var engines = require('consolidate');

var utils = require('./app/utils.js');
var pages = require('./conf/pages.json').pages;

// I like QEJS. :-)
app.engine('html', engines.qejs);
app.set('view engine', 'qejs');

// Read POST params
app.use(express.bodyParser());

// Write and read cookies.
app.use(express.cookieParser());

// Serve static assets.
app.use(express.static(__dirname + '/public'));

// Pages are driven by conf/pages.json
// FIXME Update to use underscore.each()
for (var i = 0, l = pages.length; i < l; i++) {
    (function () {
        var page = pages[i];

        app.get(page.url, function (req, res) {
            utils.redirectNonLoggedInUsers(req, res);

            var data = {
                pages: pages,
                currentPage: page
            };
            res.render(page.template, data);
        });
    }());
}

app.get('/login/', function (req, res) {
    var data = {
        currentPage: {
            "pageTitle": "Login | Elanè & Blake"
        }
    }
    res.render('login.html', data);
});

app.post('/login/', function (req, res) {
    if (req.body.password === 'once upon a time') {
        var oneYearInMs = 1000 * 60 * 60 * 24 * 365;
        res.cookie('loggedIn', true, { maxAge: oneYearInMs });
        res.redirect('/');
    } else {
        var data = {
            currentPage: {
                "pageTitle": "Login | Elanè & Blake"
            },
            failedValidation: true
        }
        res.render('login.html', data);
    }
});

app.listen(3000);