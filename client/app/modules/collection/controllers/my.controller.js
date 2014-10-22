;(function() {
  'use strict';

  angular
    .module('collection')
    .controller('MyCtrl', MyCtrl);

  /* @inject */
  function MyCtrl(Resolved) {
    var vm = this;
    console.log(Resolved);
    vm.collections = Resolved.collections;
    vm.favorites = Resolved.favorites;
  }

}).call(this);