

(function() {

function ItemResource($resource) {
  return $resource('/api/items/:id/:controller', {
    id: '@_id'
  }, {
    
    getItems:{
      method:'GET',
      isArray:true
    },
    getItem:{
      method:'GET'
    },
    updateDetails:{
      method:'PUT'
    },
    disable:{
      method:'DELETE'
    },
    getFeatured: {
      method: 'GET',
      isArray: true,
      url : '/api/items/getFeatured' 
    },
    updateFeatured: {
      method: 'PUT',
      url : '/api/items/updateFeatured/:id' 
    }
  });
}

angular.module('foodXApp.auth')
  .factory('Item', ItemResource);

})();