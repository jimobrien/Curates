(function() {
  'use strict';

  var auth = require('./auth.services');
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  var setup = function (User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
        User.findOne({email: email.toLowerCase()}, function(err, user) {
          if (err) {
            return done(err);
          } else if (!user) {
            return done(null, false, { message: 'This email is not registered.' });
          } else if (!user.authenticate(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          } else {
            return done(null, user);
          }

        });
      }
    ));
  };


  module.exports = function(app, User) {
    setup(User);

    app.post('/', function(req, res, next) {
      passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) {
          return res.json(401, error);
        } else if (!user) {
          return res.json(404, {message: 'Something went wrong, please try again.'});
        }

        var token = auth.signToken(user.id, user.role);
        res.json({token: token});

      })(req, res, next);
    });
  };
  
})();