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
          Resolved: Resolved,
        }
      });

    /* @inject */
    function Resolved(Auth, Collection) {
      var user = Auth.getCurrentUser();
      return Collection.getList()
        .then(function(collections) {
          var results = {collections: [], favorites: []};
          collections.forEach(function(item) {
            if (user.collections && user.collections.indexOf(item._id) !== -1) {
              results.collections.push(item);
            } else if (user.favorites && user.favorites.indexOf(item._id) !== -1){
              results.favorites.push(item);
            }
          });

          return results;
        });
    }
  }

}).call(this);