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
    },
    getUserOrders:{
     method:'GET',
     isArray:true,
     url:'/api/orders/customer/:id'
    }
  });
}

angular.module('foodXApp.auth')
  .factory('Orders', OrderResource);

})();
