'use strict';

angular.module('foodXApp', [
  'foodXApp.auth',
  'foodXApp.admin',
  'foodXApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
