;(function() {
  'use strict';

  angular
    .module('collection')
    .controller('MyCtrl', MyCtrl);

  /* @inject */
  function MyCtrl(Resolved) {
    var vm = this;
    // vm.collections = Resolved.collections;
    // vm.favorites = Resolved.favorites;
  }

}).call(this);