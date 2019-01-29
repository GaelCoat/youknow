var lusca = require('lusca');
var q = require('q');
var morgan = require('morgan');
var config = require('config');
var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

// On expose le serveur express
var app = module.exports = express();

app.use(serveStatic(__dirname + '/app/build', {
  index: false,
  maxAge: '10d',
}));

app.use(bodyParser.json({ limit:'5mb' }));
app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));

app.set('x-powered-by', 'Brain connection');
app.set('view engine', 'pug');
app.set('views', __dirname + '/app/views/');

app.use(morgan(':method :url'));

app.use(lusca({
    // csrf: true,
    // csp: { /* ... */},
    xframe: 'SAMEORIGIN',
    // p3p: 'ABCDEF',
    // hsts: {maxAge: 31536000, includeSubDomains: true},
    xssProtection: true
}));

require('./api/routes')(app);
