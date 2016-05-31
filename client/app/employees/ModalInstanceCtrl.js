'use strict';

(function() {

class ModalInstanceCtrl {
  user = {};
  errors = {};
  submitted = false;
  constructor(Auth,$state,$scope,$uibModalInstance,user, User,action,fileUpload,Category) {
    this.$uibModalInstance=$uibModalInstance;
    this.Auth = Auth;
    this.$state = $state;
    this.$scope=$scope;
    this.user=user;
    this.Category=Category;
    this.action=action;
    this.role=user.role;
    this.User = User; 
    this.fileUpload=fileUpload;
    this.current_user=Auth.getCurrentUser();
    if(angular.equals(this.user,this.current_user)){
      this.currentUser=true;
    }else{
      this.currentUser=false
    }
  }
  init(){

    this.Category.findAll().$promise.then(res=>{
     this.categories=res;
    
    })
  }
  register(form){
    this.submitted = true;
  	if (form.$valid && this.action) {
      this.Auth.createUser({
        name: this.user.name,
        lastname:this.user.lastname,
        email: this.user.email,
        password: this.user.password,
        role:this.role,
        address:this.user.address,
        gender:this.user.gender,
        file:this.user.file
      }).then(data => {
         this.$uibModalInstance.close(data);
      }).catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
    if(form.$valid && !this.action){
      this.User.userUpdate({
        _id:this.user._id,
        name: this.user.name,
        lastname:this.user.lastname,
        email: this.user.email,
        address:this.user.address,
        gender:this.user.gender
      }).$promise.then(data=>{
        this.$uibModalInstance.close(data)
      }).catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
  delete(){
    this.User.remove({id: this.user._id}, resp => {
      this.$uibModalInstance.close(true)
    })
    
  }
  disableCategory(){
    this.Category.disable({id: this.user._id}).$promise.then(data => {
      this.$uibModalInstance.close(true)
    })
  }
  cancel(){
   this.$uibModalInstance.dismiss('cancel');
  }
  
   addFile() {
   this.fileUpload.uploadfile(this.$scope.files,this.user._id)
    .then((res) => {
         this.$uibModalInstance.close(res);
    }).catch(err=>{

    })
  
}
uploadedFile(element){

 this.$scope.$apply(function($scope) {
   $scope.files = element.files; 
   console.log($scope.files)        
 });
}
addCategories(form){
 this.submitted = true;
    if (form.$valid ) {
      this.Category.save({
        name: this.category.name
      }).$promise.then(data => {
         this.$uibModalInstance.close(data);
      }).catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
      }
}

}

angular.module('foodXApp')
  .controller('ModalInstanceCtrl', ModalInstanceCtrl);

})();