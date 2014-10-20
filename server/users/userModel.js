(function() {
  'use strict';
  
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    email: {
      require: true,
      type: String,
    },
    firstName: {
      require: true,
      type: String,
    },
    lastName: {
      require: true,
      type: String,
    },
    token: String,
    tokenExpiration: Date,
    salt: String,
    provider: {
      required: 'true',
      type: String
    },
    password: String,
    favorites: [String],
    votes: [String]
  });

  module.exports = mongoose.model('User', UserSchema);
})();