(function() {
  'use strict';
  
  var morgan = require('morgan');
  var bodyParser = require('body-parser');

  module.exports = function(app, express) {
    // Setup middleware
    app.use(express.static(__dirname + 'client'));
    app.use(morgan('tiny'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
  };

})();