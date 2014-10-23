;(function(){
'use strict';
  angular
    .module('auth')
    .config( authenticationConfig );

  /* @inject */
  function authenticationConfig($locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

}).call(this);