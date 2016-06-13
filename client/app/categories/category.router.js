'use strict';

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('category', {
        url: 'categories',
        parent: 'main',
        templateUrl: 'app/categories/category.html',
        controller: 'CategoryController',
        controllerAs: 'ct',
        authenticate: true
      })
      .state('subcategory', {
        url     : 'categories/:id',
        templateUrl: 'app/categories/subcategory.html',
         controller: 'CategoryController',
        controllerAs: 'ct', 
        parent: 'main',
        authenticate: true
    
  })
  });