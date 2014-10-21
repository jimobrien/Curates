(function(){
  'use strict';

  var passport = require('passport');
  var jwt = require('jsonwebtoken');
  var expressJwt = require('express-jwt');
  var compose = require('composable-middleware');
  var User = require('../users/userModel');
  
  var validateJwt = expressJwt({secret: 'stuff'});

  module.exports = {
    isAuthenticated: function() {
      return compose()
        .use(function(req, res, next) {
          if (req.query && req.query.hasOwnProperty('accessToken')) {
            req.headers.authorization = 'Bearer ' + req.query.accessToken;
          }
          validateJwt(req, res, next);
        })
        .use(function(req, res, next) {
          User.findOne({_id: req.user.id}, function(err, user) {
              if (err) {
                return next(err);
              } else if (!user) {
                return res.send(401, 'User not found.');
              } else {
                req.user = user;
                next();
              }
            });
          });
    },

    hasRole: function(required) {
      if (!required) {
        throw new Error('Required role needs to be set.');
      }

      return compose()
        .use(this.isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
          if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(required)) {
            next();
          }
          else {
            res.send(403);
          }
        });
    },

    signToken: function(id) {
      return jwt.sign({ id: id }, 'stuff', { expiresInMinutes: 60 * 5 });
    },

    setTokenCookie: function(req, res) {
      if (!req.user) {
        return res.json(404, { message: 'Something went wrong, please try again.'});
      }

      var token = this.signToken(req.user.id, req.user.role);
      res.cookie('token', JSON.stringify(token));
      res.redirect('/');
    }
  };

})();