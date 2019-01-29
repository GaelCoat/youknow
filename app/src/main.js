"use strict";

var Application = require("./app");
var app = window.App = new Application();

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
// --------------------------------------------------
// On lance le chargement de l'application
// --------------------------------------------------
app.start();
Backbone.history.start({ pushState: true });

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
  escape: /\{\{\-(.+?)\}\}/g,
  evaluate: /\<\%(.+?)\%\>/gim
};





