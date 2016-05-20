'use strict';

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('chefs', {
        url: '/chefs',
        parent: 'main',
        templateUrl: 'app/Chefs/chefs.html',
        controller: 'ChefController',
        controllerAs: 'chef',
        authenticate: true
      });
  });