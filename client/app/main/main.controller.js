'use strict';

(function() {

class MainController {

  constructor($http, $scope, Auth) {
    this.$http = $http;
    // this.socket = socket;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn();
    this.menuOpened=false;
    this.getCurrentUser = Auth.getCurrentUser;
    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });
  }

  // $onInit() {
  //   this.$http.get('/api/things').then(response => {
  //     this.awesomeThings = response.data;
  //     // this.socket.syncUpdates('thing', this.awesomeThings);
  //   });
  // }

  // addThing() {
  //   if (this.newThing) {
  //     this.$http.post('/api/things', { name: this.newThing });
  //     this.newThing = '';
  //   }
  // }

  // deleteThing(thing) {
  //   this.$http.delete('/api/things/' + thing._id);
  // }
  toggleMenu(event){
    this.menuOpened = !(this.menuOpened);
    event.stopPropagation();
  }
  // logout(){
  //  this.logout()
   
  // }
}

angular.module('foodXApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'vm'
  });

})();
