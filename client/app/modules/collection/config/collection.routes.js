;(function() {
  'use strict';

  angular
    .module('collection')
    .config(CollectionRoutes);

  /* @inject */
  function CollectionRoutes($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'app/modules/collection/views/create.view.html',
        controller: 'CreateCtrl as vm'
      })   
      .state('my', {
        url: '/my',
        templateUrl: 'app/modules/collection/views/my.view.html',
        controller: 'MyCtrl as vm',
        resolve : {
          Resolved: Resolved
        }
      });

    /* @inject */
    function Resolved(Collection) {
    }
  }

}).call(this);