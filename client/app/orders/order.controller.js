'use strict';

(function() {

class OrderController {

  constructor($scope, Auth,Item,$uibModal,Orders) {
    this.isLoggedIn = Auth.isLoggedIn();
    this.getCurrentUser = Auth.getCurrentUser;
    this.Item=Item;
    this.$uibModal=$uibModal;
    this.$scope=$scope;
    this.Orders=Orders;
  }  
  init(){
    this.Orders.get().$promise.then(res=>{
     this.orders=res;
    })
  }
}
angular.module('foodXApp')
 .controller('OrderController', OrderController);
})();