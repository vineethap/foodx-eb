'use strict';

(function() {

class FeaturedController {

  constructor($scope, Auth,Item,$uibModal) {
    this.isLoggedIn = Auth.isLoggedIn();
    this.getCurrentUser = Auth.getCurrentUser;
    this.Item=Item;
    this.$uibModal=$uibModal;
    this.$scope=$scope;
  }
  init(){
   this.featured_list=this.Item.getFeatured();
  }
  openConfirm(item,index){
  	var uibModalInstance = this.$uibModal.open({
       animation: this.$scope.animationsEnabled,
       templateUrl: 'confirmModal.html',
       controller: 'ItemModalCtrl as vm',
       size: 'md',
       resolve: {
        user:()=>{
          return '';
        } ,
        action:()=>{
          return '';
        },item:()=>{
          return item;
        }
      }
     });
     uibModalInstance.result.then(res=>{
     this.featured_list.splice(index, 1);
    });
  }
  
}
angular.module('foodXApp')
 .controller('FeaturedController', FeaturedController);
})();