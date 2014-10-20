(function() {
  'use strict';
  var userController = require('./userController');
  // var Auth = require('../auth/main');

  module.exports = function(app) {

    // Setup API on /users
    app.get('/', /*Auth.isAdmin,*/ userController.fetchAll);
    app.get('/:id', /*Auth.isAuthorized,*/ userController.fetchOne);
    app.post('/', /*Auth.isAdmin,*/ userController.addUser);
    app.put('/', /*Auth.isAuthorized,*/ userController.editUser);
    app.patch('/', /*Auth.isAuthorized,*/ userController.editUser);
    app.delete('/', /*Auth.isAuthorized,*/ userController.removeUser);

  };
})();