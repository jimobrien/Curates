;(function(){
  'use strict';

  angular
    .module('core', [
      'auth'
      ])
    .constant('serverBaseUrl', 'http://localhost:3000')
    .constant('serverUrl', 'http://localhost:3000/api');

}).call(this);