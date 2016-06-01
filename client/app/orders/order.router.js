'use strict';
angular.module('foodXApp.order', [
  'foodXApp.auth',
  'ui.router'
]);

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('order', {
        url: '/order',
        templateUrl: 'app/orders/order.html',
        controller: 'OrderController',
        controllerAs: 'vm',
        parent:'main',
        authenticate: true
      })
    })