'use strict';

angular.module('foodXApp', [
  'foodXApp.auth',
  'foodXApp.admin',
  'foodXApp.constants',
  'oc.lazyLoad', 
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
    
      .otherwise('/dashboard');

    $locationProvider.html5Mode(true);
  });
