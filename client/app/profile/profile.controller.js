'use strict';

(function() {

class ProfileController {
  constructor(User,$scope,$state,Category,$uibModal,$stateParams,Auth,Upload,Item) {
    // Use the User $resource to fetch all users
    this.current_user=Auth.getCurrentUser()
    this.$scope=$scope;
    this.$state = $state;
    this.id=$stateParams.id;
    this.User=User;
    this.$uibModal=$uibModal;
    this.Upload=Upload;
    this.Category=Category;
    this.Item=Item;
   
console.log($stateParams)
  }
  init=()=>{
    
    if( this.current_user.role==='admin'){
     this.user = this.User.getUser({id:this.id});
     this.items=this.Item.getItems({chef_id:this.id})
    }else{
      if(this.id===this.current_user._id){
        this.user = this.User.getUser({id:this.id});
        this.items=this.Item.getItems({chef_id:this.id})
      }else{
        this.user=''
        this.$state.go('main')
      }
    }

  };
  open=(size,action)=> {
    this.userdetail=angular.copy(this.user);
     var uibModalInstance = this.$uibModal.open({
       animation: this.$scope.animationsEnabled,
       templateUrl: 'app/template.html',
       controller: 'ModalInstanceCtrl as vm',
       size: size,
       resolve: {
         user:()=> {
            return this.userdetail
            
          },
          action:()=>{
            return action
          } 
       }
     });
     uibModalInstance.result.then(data=>{
      
      this.user=data
    });
  };
   
  openModal() {
    if(this.id===this.current_user._id){
     var uibModalInstance = this.$uibModal.open({
       animation: this.$scope.animationsEnabled,
       templateUrl: 'ModalContent.html',
       controller: 'ModalInstanceCtrl as vm',
       size: 'md',
       resolve: {
        user:()=>{
          return this.user;
        } ,
        action:()=>{
          return '';
        }
      }
     });
     uibModalInstance.result.then(res=>{
      this.user.profile_img=res.data.profile_img;
    });
   }
  }
  
  addItems(){
    var uibModalInstance = this.$uibModal.open({
       animation: this.$scope.animationsEnabled,
       templateUrl: 'app/profile/items.html',
       controller: 'ItemModalCtrl as vm',
       size: 'lg',
       resolve: {
        item:()=>{
          return '';
        } ,
        user:()=>{
          return this.user;
        },
        action:()=>{return false;}
      }
     });
    uibModalInstance.result.then(res=>{
     this.items.push(res.data)
    });
  }
  editItem(item){
    this.item_details=angular.copy(item);
    var uibModalInstance=this.$uibModal.open({
      animation:this.$scope.animationsEnabled,
      templateUrl:'app/profile/items.html',
      controller:'ItemModalCtrl as vm',
      size:'lg',
      resolve:{
        item:()=>{
          return this.item_details;
        },
        user:()=>{
          return this.user;
        },
        action:()=>{return true;}
      }
    })
     uibModalInstance.result.then(res=>{
     this.item= res.data;
     item.item_image=res.data.item_image;
    });

  }
  deleteItem(size,item){
    var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ItemModalCtrl as vm',
      size: size,
      resolve: {
        item:()=>{
          return item;
        },
        user:()=>{
          return '';
        } ,
        action:()=>{return '';}
      }
    });
      uibModalInstance.result.then(data=>{
        item.active = !item.active;
      });
    };
  openFeaturedModal(item){
    var uibModalInstance = this.$uibModal.open({
      animation: this.$scope.animationsEnabled,
      templateUrl: 'featuredmodal.html',
      controller: 'ItemModalCtrl as vm',
      size: 'md',
      resolve: {
        item:()=>{
          return item;
        },
        user:()=>{
          return '';
        } ,
        action:()=>{return '';}
      }
    });
      // uibModalInstance.result.then(data=>{
      //   item.active = !item.active;
      // });
    };
}

angular.module('foodXApp')
  .controller('ProfileController', ProfileController);

})();