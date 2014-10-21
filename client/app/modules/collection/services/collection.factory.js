;(function(){
'use strict';

  angular
    .module('collection')
    .factory('Collection', Collection);

    /* @inject */
    function Collection(Auth, collectionRestangular, $q, logger, serverUrl, $http) {
      var self = this;

      var CollectionService = collectionRestangular.all('collection');
      var collectionApi = createUrl(serverUrl, 'collections');

      return {
        fetchAll: fetchAll,
        fetchUserCollections: fetchUserCollections,
        createCollection: createCollection,
        editCollection: editCollection
      };

      function fetchAll() {

      }

      function fetchUserCollections() {
        // Cool stuff here... using
        // Auth.currentUser._id;
      }

      function createCollection(collection) {

      }

      function editCollection(newData, cb) {
        var q = $q.defer();
        var callback = cb || angular.noop;

        return $http.put(createUrl(collectionApi, Auth.currentUser._id), newData)
          .then( function (data){
            logger.logSuccess('Changes Saved');
            q.resolve(data);
          })
          .catch( function (error){
            logger.logSuccess('Error Saving Changes');
            q.reject(error);
          });
      }

      // Helper function, not exposed
      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }
    }

}).call(this);