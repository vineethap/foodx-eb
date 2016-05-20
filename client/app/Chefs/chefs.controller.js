'use strict';

(function() {

class ChefController {
  constructor(User,$scope,$state,$uibModal) {
    // Use the User $resource to fetch all users
    this.users = User.query({role:'chef'});
    this.$scope=$scope;
    this.$state = $state;
    this.$uibModal=$uibModal;
  }
  open=(size,action)=> {
    var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'app/template.html',
      controller: 'ModalInstanceCtrl as vm',
      size: size,
      resolve: {
        user: function() {
          return {
            role: 'chef'
          };
        },
        action:()=>{
              return action;
        }
      }
    });
    uibModalInstance.result.then(data=>{
      this.users.push(data.user)
    })
  };
  delete=(size,user)=> {
    var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl as vm',
      size: size,
      resolve: {
        user:()=>{
          return user;
        },
        action:()=>{
          return '';
        } 
      }
    });
      uibModalInstance.result.then(data=>{
        user.active = !user.active;
      });
    };
}

angular.module('foodXApp')
  .controller('ChefController', ChefController);

})();