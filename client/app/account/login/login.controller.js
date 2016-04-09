'use strict';

class LoginController {
  constructor(Auth, $scope, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    
    this.Auth = Auth;
    this.isLoggedIn = Auth.isLoggedIn();
    this.$scope=$scope;
    this.$state = $state;
  }
 
  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then((result) => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('foodXApp')
  .controller('LoginController', LoginController);
