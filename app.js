var express = require('express');
var app = express();

var clubsController = require('./controllers/ClubController');

app.use('/clubs', clubsController);

module.exports = app;
