'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    getUser: {
      method: 'GET',
      params:{
        id:'id'
      }
    },
    userUpdate:{
     method:'PUT'
    },
    remove: {
      method: 'DELETE'
    }
  });
}

angular.module('foodXApp.auth')
  .factory('User', UserResource);

})();
