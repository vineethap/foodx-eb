'use strict';

(function() {

class CategoryController {

  constructor($http, $scope, Auth,Modal,$uibModal,Category,$stateParams) {
    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedIn();
    this.$uibModal=$uibModal;
    this.$scope=$scope;
    this.Category=Category;
    this.show=false;
    this.elem={};
    this.id=$stateParams.id;
  }
  init(){
    this.Category.findAll().$promise.then(res=>{
     this.categories=res;
    })
  }
  initSubCategory(){
    this.Category.getCategory({id:this.id}).$promise.then(res=>{
     this.category=res;
     this.subcategory=res.subcategory;
    });
  }
  openModal=(size)=>{
     var uibModalInstance = this.$uibModal.open({
       animation: this.$scope.animationsEnabled,
       templateUrl: 'addCategories.html',
       controller: 'ModalInstanceCtrl as vm',
       size: size,
       resolve: {
         user:()=> {
            return ''
          },
          action:()=>{
            return '';
          }
       }
     });
    uibModalInstance.result.then(data=> {
     this.categories.push(data.category)
     // this.categories[...data.category]
    });
  };
  deleteCategory(size,item){
    var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'deleteModal.html',
      controller: 'ModalInstanceCtrl as vm',
      size: size,
      resolve: {
        user:()=>{
          return item;
        } ,
        action:()=>{
          return '';
        }
      }
    });
      uibModalInstance.result.then(data=>{
       item.active = !item.active;
      });
    }
  editCategory(elem,index){
    this.Category.updateDetails({
      _id:elem._id,
      category:elem.name,
      item:elem.item
    }).$promise.then(res=>{
       this.show=false;
       this.categories[index]=res;
      })
  }
  
    addSubCategory(){
      var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'subcategory.html',
      controller: 'ItemModalCtrl as vm',
      size: 'md',
      resolve: {
         item:()=>{
          return this.id;
        },
        user:()=>{
          return '';
        } ,
        action:()=> ''
      }
    })
      uibModalInstance.result.then(data=>{
        this.category=data;

      }); 
    }
  editSubCategory(sub_ct,index,status){
    this.subcategory.splice(index, 1);
    if(status){
    this.subcategory.splice(index, 0, sub_ct);
    }
    this.Category.updateDetails({
      _id:this.id,
      subcategory:this.subcategory
    })
    this.show=false;
  }
  deleteSubCategory(sub_ct,index){
    var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'deletemodal.html',
      controller: 'ItemModalCtrl as vm',
      size: 'sm',
      resolve: {
         item:()=>{
          return sub_ct;
        },
        user:()=>{
          return this.subcategory;
        } ,
        action:()=> {return ({index:index,id:this.id})}
      }
    })
      uibModalInstance.result.then(data=>{
         this.subcategory=data.subcategory;
      }); 
  }
}
angular.module('foodXApp')
  .controller('CategoryController', CategoryController);

})();