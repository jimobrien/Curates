;(function(){
  'use strict';
  angular.module('collection')
  .factory('Collection', Collection);

  /* @inject */
  function Collection ($resource) {
    return $resource('http://localhost:3000/api/collections');
  }
  
}).call(this);

