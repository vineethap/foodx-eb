'use strict';

angular.module('foodXApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'main';
          Auth.logout();
          $state.go('login');
        }
      })
      .state('register', {
        url: '/add-new/:status',
        templateUrl: 'app/account/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('settings', {
        url: 'settings',
        parent: 'main',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });

  })
  .run(function ($rootScope, $location, Auth) {
// Redirect to login if route requires auth and you're not logged in
 $rootScope.$on('$stateChangeStart', function (event, next) {
  Auth.isLoggedIn(function(loggedIn) {
    if (!loggedIn) {
      $location.path('/login');
    }
  });
});
});