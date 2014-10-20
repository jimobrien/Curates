(function() {
  'use strict';
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema();

  var CollectionSchema = new Schema({
    title: {
      require: true,
      type: String
    },
    description: {
      require: true,
      type: String
    },
    links: [
      {
        title: {
          require: true,
          type: String
        },
        url: {
          require: true,
          type: String
        },
        description: {
          require: true,
          type: String,
        }
      }
    ],
    votes: Number
  });

  module.exports = mongoose.model('Collection', CollectionSchema);
})();