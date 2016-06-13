'use strict';

angular.module('foodXApp', [
  'foodXApp.auth',
  'foodXApp.admin',
  'foodXApp.constants',
  'oc.lazyLoad', 
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });


/*
  'btford.socket-io',
*/