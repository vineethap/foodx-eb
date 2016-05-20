'use strict';

class FileuploadController {
  //start-non-standard

  constructor(Upload,$timeout,$scope) {
    this.Upload = Upload;
    // this.isAdmin = Auth.isAdmin;
    // this.logout = Auth.logout;
    this.$scope=$scope;
    // this.getCurrentUser = Auth.getCurrentUser;
  }
 
   addFile() {
    console.log( this.$scope.files)
 this.Upload.uploadfile(this.$scope.files,
   function( msg ) // success
   {
    console.log('uploaded');
   },
   function( msg ) // error
   {
    console.log('error');
   });
}


uploadedFile(element){

 this.$scope.$apply(function($scope) {
   $scope.files = element.files;         
 });
    console.log("fgkj",element.files)
}
    
}

angular.module('foodXApp')
  .controller('FileuploadController', FileuploadController);
