(function() {
  'use strict';

  var auth = require('./auth.services.js');
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var config = require('./auth.config');

  var setup = function(User) {
    return passport.use(new FacebookStrategy({
      clientID: config.facebook.id,
      clientSecret: config.facebook.secret,
      callbackURL: config.facebook.url
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({email: profile.emails[0].value}, function(err, user) {
        if (err) {
          return done(err);
        } else if (!user) {
          var newUser = new User({
            firstName: profile.displayName.split(' ')[0],
            lastName: profile.displayName.split(' ')[1],
            email: profile.emails[0].value,
            role: 'user',
            provider: 'facebook',
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
    
    // Route to FB for authentication
    app.get('/', passport.authenticate('facebook', {
      scope: ['email', 'user_about_me'],
      failureRedirect: '/signup',
      session: false
    }));

    // Handle return call
    app.get('/callback', passport.authenticate('facebook', {
      failureRedirect: '/signup',
      session: false
    }), auth.setTokenCookie.bind(auth));
  };
  
})();