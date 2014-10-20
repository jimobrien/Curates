(function() {
  'use strict';

  module.exports = function(app, express) {
    // Instantiate routers
    var userRouter = express.Router();
    var collectionRouter = express.Router();
    var authRouter = express.Router();

    // Listen on API endpoints
    app.use('/users', userRouter);
    app.use('/collections', collectionRouter);
    app.use('/auth', authRouter);

    // Setup routes
    require('../users/index')(userRouter);
    require('../collections/index')(collectionRouter);
    require('../auth/index')(authRouter);
  };

})();