;(function() {
  'use strict';

  angular
    .module('collection')
    .controller('CreateCtrl', CreateCtrl);

  /* @inject */
  function CreateCtrl(Auth) {
    var vm = this;
    vm.collection = {
      // user: Auth.user._id
    };
  }
  
}).call(this);