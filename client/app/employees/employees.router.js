'use strict';

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('employee', {
        url: '/staff',
        parent: 'main',
        templateUrl: 'app/employees/employees.html',
        controller: 'EmployeeController',
        controllerAs: 'emp',
        authenticate: 'admin'
      });
  });
 