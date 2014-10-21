;(function(){
  'use strict';

  angular
    .module('collection')
    .factory('collectionRestangular', collectionRestangular);

  /* @inject */
  function collectionRestangular(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:3000/api');
    });
  }

}).call(this);