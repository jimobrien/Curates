(function() {
  'use strict';

  var _ = require('lodash');
  var User = require('./user.model');

  var handleError = function(res, err) {
    return res.send(500, err);
  };

  module.exports = {
    fetchAll: function(req, res) {
      User.find(function(err, users){
        if (err) {
          return handleError(res, err);
        } else {
          res.json(200, users);
        }
      });
    },

    fetchOne: function(req, res) {
      User.findOne(req.params._id, function(err, collection) {
        if (err) {
          return handleError(res, err);
        } else if (!collection) {
          return res.send(404);
        } else {
          return res.json(200, collection);
        }
      });
    },

    addUser: function(req, res) {
      User.findOne(req.body, function(err, collection) {
        if (err) {
          return handleError(res, err);
        } else if (collection) {
          return res.send(409, 'User already exists');
        } else {
          var newUser = new User(req.body);
          newUser.save(function(err, collection) {
            return res.json(201, collection);
          });
        }
      });
    },

    editUser: function(req, res) {
      User.findOne(req.params._id, function(err, collection) {
        if (err) {
          return handleError(res, err);
        } else if (!collection) {
          return res.send(404, 'User does not exist');
        } else {
          var newUser = _.merge(collection, req.body);
          newUser.save(function(err, collection) {
            if (err) {
              return handleError(res, err);
            } else {
              return res.json(201, collection);
            }
          });
        }
      });
    },

    removeUser: function(req, res) {
      User.remove(req.params._id, function(err) {
        if (err) {
          return handleError(res, err);
        } else {
          return res.send(204, 'User removed');
        }
      });
    }

  };

})();