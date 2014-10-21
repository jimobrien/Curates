;(function(){
  'use strict';
  //Setting up route
  angular
    .module('administration')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // administration state routing
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/modules/administration/views/admin.view.html',
        abstract:true,
        controller: 'AdminController as vm'
      });

  }

}).call(this);