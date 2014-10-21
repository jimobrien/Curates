(function() {
  'use strict';

  var User = require('../users/user.model');

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
    require('./auth.local')(localRouter, User);
    require('./auth.facebook')(facebookRouter, User);
    require('./auth.google')(googleRouter, User);

  };

})();

