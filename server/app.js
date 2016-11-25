var express = require("express"),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require("body-parser"),
    flash = require('express-flash'),
    load = require('express-load'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rd-fe-test', function(err) {
    if (err) {
        console.log("Erro connect Mongodb:" + err);
        return;
    }

    console.log("Conect success Mongodb");
});

var app = express();

// setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

load('models').then('controllers').then('routes').into(app);

app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});