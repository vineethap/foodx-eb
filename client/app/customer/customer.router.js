'use strict';
angular.module('foodXApp.customer', [
  'foodXApp.auth',
  'ui.router'
]);

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('customer', {
        url: 'customers',
        templateUrl: 'app/customer/customer.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        parent:'main',
        authenticate: true
      })
      .state('customer-orders', {
        url     : 'customers/:id',
        templateUrl: 'app/customer/customer_order.html',
        controller: 'CustomerController',
        controllerAs: 'vm', 
        parent: 'main',
        authenticate: true
    
      })
    })