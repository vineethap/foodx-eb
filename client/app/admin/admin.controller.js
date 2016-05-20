'use strict';

(function() {

class AdminController {
  constructor(User,$scope,$state,$uibModal,Auth) {
    // Use the User $resource to fetch all users
    this.users = User.query({role:'admin'});
    this.$scope=$scope;
    this.$state = $state;
    this.$uibModal=$uibModal;
    this.user=Auth.getCurrentUser();
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
              role: 'admin'
            };
          },
          action:()=>{
            return action;
        }
       }
        
     });
     uibModalInstance.result.then(data=>{
      let user=data.user
      this.users.push(user)
    });
  };
  delete=(size,user)=>{
    var uibModalInstance = this.$uibModal.open({
       animation: this.$scope.animationsEnabled,
       templateUrl: 'myModalContent.html',
       controller: 'ModalInstanceCtrl as vm',
       size: size,
       resolve: {
         user: function() {
            return user;
          },
          action:()=>{
            return '';
          } 
       }
     });
      uibModalInstance.result.then(data=> {
        user.active = !user.active;
      });
    }
  
}

angular.module('foodXApp')
  .controller('AdminController', AdminController);

})();
