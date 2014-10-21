;(function(){
'use strict';
  angular
    .module('auth')
    .factory( 'authRestangular', authRestangular )
    .config( authenticationConfig );

  /* @inject */
  function authenticationConfig($locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

  /* @inject */
  function authRestangular(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:3000/api');
    });
  }
}).call(this);