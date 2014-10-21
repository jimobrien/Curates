(function() {
  'use strict';

  var User = require('../users/userModel');

  module.exports = function(app, express) {

    // Instantiate sub-routers
    var localRouter = express.Router();
    var facebookRouter = express.Router();
    var googleRouter = express.Router();
    
    // Route listening
    app.use('/local', localRouter);
    app.use('/facebook', facebookRouter);
    app.use('/google', googleRouter);

    // Route configuration
    require('./local')(localRouter, User);
    require('./facebook')(facebookRouter, User);
    require('./google')(googleRouter, User);

  };

})();

