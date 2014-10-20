(function() {
  'use strict';

  var _ = require('lodash');
  var Collection = require('./collectionModel');

  var handleError = function(res, err) {
    return res.send(500, err);
  };

  module.exports = {
    fetchAll: function(req, res) {
      Collection.find(function(err, collections){
        if (err) {
          return handleError(res, err);
        } else {
          res.json(200, collections);
        }
      });
    },

    fetchOne: function(req, res) {
      Collection.findOne(req.params._id, function(err, collection) {
        if (err) {
          return handleError(res, err);
        } else if (!collection) {
          return res.send(404);
        } else {
          return res.json(200, collection);
        }
      });
    },

    addCollection: function(req, res) {
      Collection.findOne(req.body, function(err, collection) {
        if (err) {
          return handleError(res, err);
        } else if (collection) {
          return res.send(409, 'Collection already exists');
        } else {
          var newCollection = new Collection(req.body);
          newCollection.save(function(err, collection) {
            return res.json(201, collection);
          });
        }
      });
    },

    editCollection: function(req, res) {
      Collection.findOne(req.params._id, function(err, collection) {
        if (err) {
          return handleError(res, err);
        } else if (!collection) {
          return res.send(404, 'Collection does not exist');
        } else {
          var newCollection = _.merge(collection, req.body);
          newCollection.save(function(err, collection) {
            if (err) {
              return handleError(res, err);
            } else {
              return res.json(201, collection);
            }
          });
        }
      });
    },

    removeCollection: function(req, res) {
      Collection.remove(req.params._id, function(err) {
        if (err) {
          return handleError(res, err);
        } else {
          return res.send(204, 'Collection removed');
        }
      });
    }

  };

})();