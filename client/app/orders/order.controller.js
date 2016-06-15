'use strict';

(function() {

class OrderController {

  constructor($scope, Auth,Item,$uibModal,Orders,$stateParams) {
    this.isLoggedIn = Auth.isLoggedIn();
    this.getCurrentUser = Auth.getCurrentUser;
    this.Item=Item;
    this.$uibModal=$uibModal;
    this.$scope=$scope;
    this.Orders=Orders;
    this.$stateParams=$stateParams
  }  
  init(){
    this.Orders.get().$promise.then(res=>{
     this.orders=res;
    })
  }
  initItems(){
    this.Orders.getOrder({id:this.$stateParams.id}).$promise.then(res=>{
     this.orders=res;
     this.items=res.items;
    });
  }
}
angular.module('foodXApp')
 .controller('OrderController', OrderController);
})();