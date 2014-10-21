;(function() {
  'use strict';

  angular
    .module('collection')
    .controller('CreateCtrl', CreateCtrl);

  /* @inject */
  function CreateCtrl(Collection, Auth) {
    var vm = this;
    vm.collection = {
      user: Auth.user._id
    };
    vm.create = Collection.post;
  }
  
}).call(this);