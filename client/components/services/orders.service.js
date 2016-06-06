'use strict';

(function() {

function OrderResource($resource) {
  return $resource('/api/orders/:id/:controller', {
    id: '@_id'
  }, {
   
    get: {
      method: 'GET',
      isArray:true
    },
    getOrder: {
      method: 'GET'
    }
  });
}

angular.module('foodXApp.auth')
  .factory('Orders', OrderResource);

})();
