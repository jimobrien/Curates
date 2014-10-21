(function() {
  'use strict';

  var auth = require('./services');
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


  module.exports = function(app) {

  };
  
})();