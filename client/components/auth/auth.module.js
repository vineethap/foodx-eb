'use strict';

angular.module('foodXApp.auth', [
  'foodXApp.constants',
  'foodXApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
