"use strict";

var q = require('q');
var config = require('config');
var _ = require('underscore');
var express = require('express');
var router = express.Router();
var isMobile = require('ismobilejs');

// Services

module.exports = function(app) {

  // A mettre à la fin
  app.route('/*').get(function(req, res) {

    res.render('index');
  });


  return app;
}

