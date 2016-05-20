'use strict';

(function() {

function CategoryResource($resource) {
  return $resource('/api/categories/:id/:controller', {
    id: '@_id'
  }, {
    save: {
      method: 'POST'
    },
    findAll:{
    	method:'GET',
      isArray:true
    },
    updateDetails:{
      method:'PUT'
    },
    
    disable:{
      method:'DELETE'
    },
    getCategory:{
      method:'GET'
    }
  });
}

angular.module('foodXApp.auth')
  .factory('Category', CategoryResource);

})();