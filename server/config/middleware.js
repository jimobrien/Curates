(function() {
  'use strict';
  
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var passport = require('passport');

  module.exports = function(app, express) {
    // Setup middleware
    app.use(express.static(__dirname + '/../../client'));
    app.use(morgan('tiny'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
  };

})();