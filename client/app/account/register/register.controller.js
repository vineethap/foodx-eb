'use strict';

class RegisterController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state,$scope, $stateParams) {
    this.Auth = Auth;
    this.$state = $state;
    this.$scope=$scope;
    this.$stateParams = $stateParams
    this.status = $stateParams.status;
    if(this.status==='0'){
      this.title='Add Admin'
    }
    else if(this.status==='1'){
      this.title="Add Chef"
    }else{
      this.title="Add New Distributor"
    }
  }
  register(form) {
    if(this.status==='0'){
      this.user.role='admin'
    }
    if(this.status==='1'){
      this.user.role='chef'
    }
    if(this.status==='2'){
      this.user.role='staff'
    }
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role:this.user.role
      })
      .then((data) => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        console.log("er")
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
     console.log("er")
  }
 
}

angular.module('foodXApp')
  .controller('RegisterController', RegisterController);
