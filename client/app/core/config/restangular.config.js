;(function(){
'use strict';
  angular
    .module('core')
    .config( restangularConfig );

  /* @inject */
  function restangularConfig(RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3000/api/');
    RestangularProvider.setRestangularFields({
      id: '_id',
      route: 'restangularRoute',
      selfLink: 'self.href'
    });


  }
}).call(this);