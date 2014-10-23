(function() {
  'use strict';
  
  var morgan = require('morgan');
  var passport = require('passport');
  var bodyParser = require('body-parser');

  module.exports = function(app, express) {

    // Setup middleware
    app.use(express.static(__dirname + '/../../client'));
    app.use(morgan('tiny'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());

    // Instantiate routers
    var authRouter = express.Router();
    var userRouter = express.Router();
    var collectionRouter = express.Router();

    // Listen on API endpoints
    app.use('/api/users', userRouter);
    app.use('/api/collections', collectionRouter);
    app.use('/auth', authRouter);

    // Wildcard routing
    app.use('/*', handleWildCard);

    // Setup routes
    require('../users/user.routes')(userRouter);
    require('../auth/auth.routes')(authRouter, express);
    require('../collections/collection.routes')(collectionRouter);
  };

  function handleWildCard(req, res, next) {
    res.redirect('/');
  }

})();