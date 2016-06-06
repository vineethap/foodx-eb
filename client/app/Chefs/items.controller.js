'use strict';

class ItemViewCtrl {
  constructor(Auth, $scope, $state,Item,$stateParams,ItemReview) {
   
    this.Auth = Auth;
    this.isLoggedIn = Auth.isLoggedIn();
    this.$scope=$scope;
    this.$state = $state;
    this.Item=Item;
    this.id=$stateParams.id;
    this.Review=ItemReview;
    this.current_user=Auth.getCurrentUser()
    this.show_btn=true;
    this.starRating3 = 2;
  }
	init(){
	 	this.item=this.Item.getItem({id:this.id});
    this.Review.itemComments({item_id:this.id,userid:this.current_user._id})
    .$promise.then(data=>{
      this.item_comments=data.review;
    })
    this.item_reviews=this.Review.getItemreviews({item_id:this.id})
	};
	submitReview(item){
    console.log(this.starRating3)
		 this.Review.createReview({
      item_id:this.item._id,
      rating:this.starRating3,
      userid:this.current_user._id,
      itemname:item.itemname,
			comment_title:item.comment_title,
			comment:item.comment,
      username:this.current_user.name
    }).$promise.then(data=>{
    	this.show=true;
    })
	}
  
}

angular.module('foodXApp')
  .controller('ItemViewCtrl', ItemViewCtrl);
