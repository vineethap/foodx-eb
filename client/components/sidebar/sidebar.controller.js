'use strict';

class SidebarController {
  //start-non-standard
 
 
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.logout = Auth.logout;
    this.getCurrentUser = Auth.getCurrentUser;
  }
  logout(){
   this.logout()
   
  }
}

angular.module('foodXApp')
  .controller('SidebarController', SidebarController);
