'use strict';

(function() {

class OrderController {

  constructor($scope, Auth,Item,$uibModal) {
    this.isLoggedIn = Auth.isLoggedIn();
    this.getCurrentUser = Auth.getCurrentUser;
    this.Item=Item;
    this.$uibModal=$uibModal;
    this.$scope=$scope;
  }  
}
angular.module('foodXApp')
 .controller('OrderController', OrderController);
})();