(function() {
  'use strict';

  var auth = require('./services');
  var passport = require('passport');
  var GoogleStrategy = require('passport-google').Strategy;
  
  var setup = function(User) {
    return passport.use(new GoogleStrategy({
      returnURL: 'http://localhost:3000/api/auth/google/return',
      realm: 'http://localhost:3000'
    },
    function(identifier, profile, done) {
      User.findOne({email: profile.emails[0].value}, function(err, user) {
        if (err) {
          return done(err);
        } else if (!user) {
          var newUser = new User({
            firstName: profile.displayName.split(' ')[0],
            lastName: profile.displayName.split(' ')[1],
            email: profile.emails[0].value,
            role: 'user',
            provider: 'google',
          });
          newUser.save(function(err, user) {
            if (err) {
              return done(err);
            }
            return done(null, user);
          });
        } else {
          return done(null, user);
        }
      });
    }));
  };

  module.exports = function(app, User) {
    setup(User);

    // Route to Google for authentication
    app.get('/', passport.authenticate('google', {
      failureRedirect: '/signup',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      session: false
    }));

    // Handle return call
    app.get('/return', passport.authenticate('google', {
      failureRedirect: '/signup',
      session: false
    }), auth.setTokenCookie.bind(auth));

  };
  
})();