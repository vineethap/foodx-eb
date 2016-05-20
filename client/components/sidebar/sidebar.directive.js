'use strict';

angular.module('foodXApp')
  .directive('sidebar', () => ({
    templateUrl: 'components/sidebar/sidebar.html',
    restrict: 'E',
    controller: 'SidebarController',
    controllerAs: 'vm'
  }));
