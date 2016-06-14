'use strict';

(function() {

class CustomerController {
  constructor(User,$scope,$state,$uibModal,Auth,Orders,$stateParams,$location) {
    this.users = User.query({role:'customer'});
    this.$scope=$scope;
    this.$state = $state;
    this.$uibModal=$uibModal;
    this.Orders=Orders;
    this.$location=$location
    this.user=Auth.getCurrentUser();
    this.$stateParams=$stateParams;
    this.id=$stateParams.id;
    
  }
  initUserorders(){
  	this.Orders.getUserOrders({id:this.$stateParams.id}).$promise.then(res=>{
      this.order=res;
      this.orders=res[0];
      if(res.length!=0){
        this.items=res[0].items;
      }
      
 	  })
  }
  
}

angular.module('foodXApp')
  .controller('CustomerController', CustomerController);

})();
