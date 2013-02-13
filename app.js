var express = require('express');
var app = express();
var engines = require('consolidate');
var pages = require('./conf/pages.json').pages;

// I like QEJS. :-)
app.engine('html', engines.qejs);
app.set('view engine', 'qejs');

// Serve static assets.
app.use(express.static(__dirname + '/public'));

// Pages are driven by conf/pages.json
// FIXME Update to use underscore.each()
for (var i = 0, l = pages.length; i < l; i++) {
    (function () {
        var page = pages[i];

        app.get(page.url, function (req, res) {
            res.render(page.template, page);
        });
    }());
}

app.listen(3000);