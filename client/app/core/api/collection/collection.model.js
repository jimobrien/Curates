;(function(){
'use strict';

  angular
    .module('core')
    .factory('Collection', Collection);

    /* @inject */
    function Collection(Restangular) {
      return Restangular.service('collections');
    }

}).call(this);