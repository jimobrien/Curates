;(function(){
  'use strict';

  angular
    .module('auth')
    .config( AuthRoutes );

  /* @inject */
  function AuthRoutes($stateProvider) {
    // Users state routing
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/modules/auth/views/signup.view.html',
        controller: 'SignupCtrl as vm'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/modules/auth/views/login.view.html',
        controller: 'LoginCtrl as vm'
      });
  }

}).call(this);