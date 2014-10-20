(function() {
  'use strict';
  var userController = require('./userController');
  // var Auth = require('../auth/main');

  module.exports = function(app) {

    // Setup API on /users
    app.get('/', userController.fetchUsers);
    app.get('/:id', userController.fetchUser);
    app.post('/', userController.addUser);
    app.put('/', userController.editUser);
    app.patch('/', userController.editUser);
    app.delete('/', userController.removeUser);

  };
})();