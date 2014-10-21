(function() {
  'use strict';
  var userController = require('./user.controller');

  module.exports = function(app) {

    // Setup API on /users
    app.get('/', userController.fetchAll);
    app.get('/:id', userController.fetchOne);
    app.post('/', userController.addUser);
    app.put('/', userController.editUser);
    app.patch('/', userController.editUser);
    app.delete('/', userController.removeUser);

  };
})();