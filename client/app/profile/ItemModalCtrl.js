'use strict';

(function() {

class ItemModalCtrl {
  item = {};
  errors = {};
  submitted = false;
  constructor($state,$scope,$uibModalInstance,user,item,action,Upload,$timeout,Category,Item,fileUpload) {
    this.$uibModalInstance=$uibModalInstance;
    this.$scope=$scope;
    this.item=item;
    this.Category=Category;
    this.Item = Item; 
    this.Upload=Upload;
    this.$timeout=$timeout;
    this.user=user;
    this.fileUpload=fileUpload;
    this.action=action;
    this.subcategory = [];
  }
  init(){

    this.Category.findAll().$promise.then(res=>{
     this.categories=res;
    
    })
  }
  
  listSubCats(x) {
    let containing=_.findIndex(this.categories, (cat)=> { return cat.name ==x });
    this.subcategories=this.categories[containing].subcategory;
  }

  newSubCategory() {
    if(event.keyCode == 13 && this.s_category){
       this.subcategory.push(this.s_category);
      this.s_category = '';
    }
  };
  
   addSubCategory(subcategory) {
    this.Category.updateDetails({
      _id:this.item,
      subcategory:subcategory,
      status:true

    }).$promise.then(response =>{
        this.result = response.data;
        this.$uibModalInstance.close(response);
      })
  };

  uploadFiles(files,form) {
    this.files = files;
    this.submitted = true;
    if (files && files.length&&form.$valid) {
      this.Upload.upload({
        url: '/api/items',
        data: {
          name: this.item.itemname,
          itemtype:this.item.itemtype,
          description: this.item.description,
          category: this.item.category,
          subcategory:this.item.subcategory,
          chef_id:this.user._id,
          item_price:this.item.item_price,
          files: files
        }
      })
      .then(response =>{
        this.result = response.data;
        this.$uibModalInstance.close(response);
      })
    }
  };
  deleteSubCategory(){
    this.user.splice(this.action.index, 1);
      this.Category.updateDetails({
        _id:this.action.id,
        subcategory:this.user
      }).$promise.then(response =>{
        this.$uibModalInstance.close(response);
      })
  }
  editItemdetails(item,files){
    this.submitted = true;
    this.Upload.upload({
        url: '/api/items/:id',
        method:'PUT',
        data: {
          id:this.item._id,
         name: item.itemname,
          itemtype:item.itemtype,
          description: item.description,
          category: item.category,
          chef_id:this.user._id,
          subcategory:this.item.subcategory,
          item_price:this.item.item_price,
          files:files
        },
        headers:{
          item_image:item.item_image
        }
      }).then(response =>{
        this.$uibModalInstance.close(response);
    })
  }

  disableCategory(){
    this.Category.disable({id: this.item._id}).$promise.then(data => {
      this.$uibModalInstance.close(true)
    })
  }
  remove(file){
    this.item.item_image.splice(this.item.item_image.indexOf(file), 1);
  }
  cancel(){
   this.$uibModalInstance.dismiss('cancel');
  }
  disableItem(){
    this.Item.disable({id: this.item._id}).$promise.then(data => {
      this.$uibModalInstance.close(true)
    })
  }
  makeFeatured(item){
    this.submitted = true;
    this.fileUpload.updateItem(this.$scope.files,this.item._id,item.featured_dscrptn,item.itemname)
    .then(data => {
      this.$uibModalInstance.close(data)
    })
  }
  removeFeatured(){
    this.Item.updateFeatured({
      _id:this.item._id
    }).$promise.then(data => {
      this.$uibModalInstance.close(data)
    })
  }

  uploadedFile(element){
    this.$scope.$apply(function($scope) {
      $scope.files = element.files; 
      document.getElementById("submit").disabled = false;
      });
   }
}

angular.module('foodXApp.admin',['ngFileUpload'])
  .controller('ItemModalCtrl', ItemModalCtrl);
})();