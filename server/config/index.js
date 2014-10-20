(function() {
  'use strict';

  module.exports = function(app, express) {
    // Instantiate routers
    var userRouter = express.Router();
    var collectionRouter = express.Router();
    var authRouter = express.Router();

    // Setup routes
    var userRoutes = require('../users/index')(userRouter);
    var collectionRoutes = require('../collections/index')(collectionRouter);
    var authRoutes = require('../auth/index')(authRouter);

    // Listen on API endpoints
    app.use('/users', userRoutes);
    app.use('/collections', collectionRoutes);
    app.use('/auth', authRoutes);
  };

})();