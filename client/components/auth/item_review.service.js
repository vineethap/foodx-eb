
(function() {

function ItemReviewResource($resource) {
  return $resource('/api/item_review/:id/:controller', {
    id: '@_id'
  }, {
    
    createReview: {
      method: 'POST'
    },
    getItemreviews:{
     method: 'GET',
     isArray:true
    },
    itemComments: {
      method: 'GET',
      url:'/api/item_review/selected'
    }
  });
}

angular.module('foodXApp.auth')
  .factory('ItemReview', ItemReviewResource);

})();