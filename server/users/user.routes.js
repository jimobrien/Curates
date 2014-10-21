(function() {
  'use strict';

  var userController = require('./user.controller');
  var auth = require('../auth/auth.services');

  module.exports = function(app) {

    // Setup API on /users
    app.get('/', userController.fetchAll);
    app.get('/:id', userController.fetchOne);
    app.post('/', auth.hasRole('admin'), userController.addUser);
    app.put('/', auth.isAuthenticated(), userController.editUser);
    app.patch('/', auth.isAuthenticated(), userController.editUser);
    app.delete('/', auth.hasRole('admin'), userController.removeUser);

  };
})();