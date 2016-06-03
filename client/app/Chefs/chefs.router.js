'use strict';

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('chef', {
        url: '/chef',
        parent: 'main',
        templateUrl: 'app/Chefs/chefs.html',
        controller: 'ChefController',
        controllerAs: 'chef',
        authenticate: true
      });
  });