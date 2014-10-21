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

    // Instantiate routers
    var userRouter = express.Router();
    var collectionRouter = express.Router();
    var authRouter = express.Router();

    // Listen on API endpoints
    app.use('/api/users', userRouter);
    app.use('/api/collections', collectionRouter);
    app.use('/api/auth', authRouter);

    // Setup routes
    require('../users/user.routes')(userRouter);
    require('../collections/collection.routes')(collectionRouter);
    require('../auth/auth.routes')(authRouter, express);
  };

})();