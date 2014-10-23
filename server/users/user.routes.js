(function() {
  'use strict';

  var userController = require('./user.controller');
  var auth = require('../auth/auth.services');

  module.exports = function(app) {

    // Setup API on /users
    app.get('/', auth.isAuthenticated(), userController.fetchAll);
    app.get('/me', auth.isAuthenticated(), userController.fetchOne);
    app.get('/:id', auth.isAuthenticated(), userController.fetchOne);
    app.post('/', auth.hasRole('admin'), userController.addUser);
    app.put('/', auth.isAuthenticated(), userController.editUser);
    app.patch('/', auth.isAuthenticated(), userController.editUser);
    app.delete('/', auth.hasRole('admin'), userController.removeUser);

  };
})();