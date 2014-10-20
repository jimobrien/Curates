(function() {
  'use strict';

  // Start the express application
  var express = require('express');
  var app = express();

  // Bring in middleware and routing
  require('./config/middleware')(app, express);
  require('./config/index')(app, express);

  module.exports = app;

})();