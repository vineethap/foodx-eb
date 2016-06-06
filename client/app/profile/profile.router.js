'use strict';

angular.module('foodXApp.admin')
  .config(function($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/:user/:id',
        parent: 'main',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('singleitem', {
        url     : '/chef/:item/:id',
        templateUrl: 'app/Chefs/itemview.html',
        controller: 'ItemViewCtrl',
        controllerAs: 'vm', 
        parent: 'main',
        authenticate: true
    
  })
  });