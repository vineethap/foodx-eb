'use strict';

(function() {

class CustomerController {
  constructor(User,$scope,$state,$uibModal,Auth,Orders,$stateParams) {
    this.users = User.query({role:'customer'});
    this.$scope=$scope;
    this.$state = $state;
    this.$uibModal=$uibModal;
    this.Orders=Orders;
    this.user=Auth.getCurrentUser();
    this.$stateParams=$stateParams;
  }
  initUserorders(){
  	this.Orders.getUserOrders({id:this.$stateParams.id}).$promise.then(res=>{
      this.order=res;
 	  })
  }
  
}

angular.module('foodXApp')
  .controller('CustomerController', CustomerController);

})();
