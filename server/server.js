(function() {
  'use strict';

  // Start the express application
  var express = require('express');
  var app = express();

  // Bring in middleware and routing
  require('./config/middleware')(app, express);

  module.exports = app;

})();