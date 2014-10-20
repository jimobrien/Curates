(function() {
  'use strict';
  
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema();

  var userSchema = new Schema({
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
    password: String,
    favorites: [String],
    votes: [String]
  });

  module.exports = mongoose.model('User', UserSchema);
})();