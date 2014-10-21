;(function() {
  'use strict';

  angular
    .module('collection')
    .config(CollectionRoutes);

  /* @inject */
  function CollectionRoutes($stateProvider) {
    $stateProvider
      .state('my', {
        url: '/my',
        templateUrl: 'app/modules/collection/views/my.view.html',
        controller: 'MyCtrl as vm',
        resolve : {
          Resolved: Resolved
        }
      });

    /* @inject */
    function Resolved(Collection, User) {
      // Fetch all favorites/owned collections from the user.
      return {
        collections: ['Collection1', 'Collection2'],
        favorites: ['Favorite1', 'Favorite2']
      };
    }
  }

}).call(this);