'use strict';
angular.module('foodXApp.featured', [
  'foodXApp.auth',
  'ui.router'
]);

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('featured', {
        url: 'featured',
        templateUrl: 'app/featured/featured.html',
        controller: 'FeaturedController',
        controllerAs: 'vm',
        parent:'main',
        authenticate: true
      })
    })