;(function(){
'use strict';

  angular
    .module('auth')
    .factory('Auth', Auth);

    /* @inject */
    function Auth($storage, serverUrl, $location, $rootScope, $http, $q, logger) {
      var self = this;

      // var AuthService = authRestangular.all('auth');

      var currentUser = {};
      var userApi = createUrl(serverUrl, 'users');
      var authApi = createUrl(serverUrl, 'auth');


      if ($storage.get('user_token')) {
        // currentUser = User.one('me').get().$object;
        currentUser = {};
      }

      return {
        login: login,
        logout: logout,
        createUser: createUser,
        changePassword: changePassword,
        getCurrentUser: getCurrentUser,
        isLoggedIn: isLoggedIn,
        isLoggedInAsync: isLoggedInAsync,
        isAdmin: isAdmin,
        getToken: getToken,
        user: currentUser
      };

      function login(user, cb) {
        var callback = cb || angular.noop;
        var deferred = $q.defer();

        var LoginData = {
          email: user.email,
          password: user.password
        };

        // AuthService.all('local').post( LoginData )
        //   .then(function ( response ) {
        //     logger.logSuccess('User Logged in');
        //     $storage.setUser( response );
        //     currentUser = User.one('me').get().$object;
        //     deferred.resolve(response);
        //   })
        //   .catch(function ( err ) {
        //     logger.logError('Error Logging in');
        //     logout();
        //     deferred.reject( err );
        //   }.bind(self));

        return deferred.promise;
      }

      function logout() {
        $storage.clear('user_token');
        currentUser = {};
      }

      function createUser(user, cb) {
        var callback = cb || angular.noop;
        var q = $q.defer();
        // User.post(user)
        //   .then(function ( response ) {
        //     logger.logSuccess('User '+ response.user.name +' Created');
        //     $storage.setUser( response );
        //     currentUser = User.one('me').get().$object;
        //     q.resolve( response );
        //   })
        //   .catch(function (err) {
        //     logger.logError('Error creating User' + user.name);
        //     logout();
        //     q.reject(err);
        //   });
        return q.promise;
      }

      function changePassword(oldPassword, newPassword, cb) {
        var q = $q.defer();
        var callback = cb || angular.noop;
        var passwordData =  {
          oldPassword: oldPassword,
          newPassword: newPassword
        };

        return $http.put(createUrl(userApi,currentUser._id,'password'), passwordData)
          .then( function(data) {
            logger.logSuccess('Password Changed');
            q.resolve( data );
          })
          .catch( function(error){
            logger.logSuccess('Error Changing Password');
            q.reject( error );
          });
      }

      function getCurrentUser() {
        return currentUser;
      }

      function isLoggedIn() {
        return currentUser.hasOwnProperty('role');
      }

      function isLoggedInAsync(callback) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser
            .then(function() {
              callback(true);
            })
            .catch(function() {
              callback(false);
            });
        } else if(currentUser.hasOwnProperty('role')) {
          callback(true);
        } else {
          callback(false);
        }
      }

      function isAdmin() {
        return currentUser.role === 'admin';
      }

      function getToken() {
        return $storage.get('user_token');
      }

      function createUrl(){
        var args = Array.prototype.slice.call(arguments);
        return args.join('/');
      }
    }
}).call(this);