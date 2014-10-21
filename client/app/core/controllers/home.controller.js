;(function(){
'use strict';

  angular
    .module('core')
    .controller('HomeCtrl', HomeCtrl);

  /* @inject */
  function HomeCtrl($scope, Resolved) {
    var vm = this;
    vm.collections = Resolved;

  }
}).call(this);