'use strict';

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/dashboard',
        template: '<main></main>'
      });
  });
