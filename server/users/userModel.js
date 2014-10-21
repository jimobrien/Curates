(function() {
  'use strict';
  
  var mongoose = require('mongoose');
  var crypto = require('crypto');
  var Schema = mongoose.Schema;

  // Authentication helpers
  var makeSalt = function() {
    return crypto.randomBytes(128).toString('base64');
  };

  // Schema definition
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
    salt: String,
    provider: {
      required: 'true',
      type: String
    },
    password: String,
    favorites: [String],
    votes: [String]
  });

  // Event Listeners
  UserSchema.pre('save', function (next) {
    // Only salt and hash when password is changed
    if (!this.isModified('password')) {
      return next();
    }

    this.salt = makeSalt();
    this.encryptPassword(this.password);

    next();
  });

  // Setup Virtuals
  UserSchema.virtual('profile').get(function() {
    return {
      name: this.firstName + ' ' + this.lastName,
      email: this.email,
    };
  });

  // Authentication Methods
  UserSchema.methods.authenticate = function(plainText) {
    return this.encryptPassword(plainText) === this.password;
  };

  UserSchema.methods.encryptPassword = function(password) {
    if (!password) {
      return '';
    }
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  };

  module.exports = mongoose.model('User', UserSchema);
  
})();