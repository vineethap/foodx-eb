'use strict';
import Review from './review.model';


function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function create(req, res, next) { 
  var review = new Review(req.body);
  review.active=true;
  review.time=Date.now();
  review.save()
    .then(review =>{
    	res.json({ review:review});
    })
    .catch(validationError(res));
};
export function singleItemReviews(req, res) {
  return Review.find({item_id:req.query.item_id}).exec()
    .then(review=> {
      res.json(review);
      })
    .catch(validationError(res));
};
export function reviewOfSelected(req, res) {
  return Review.findOne({item_id:req.query.item_id,userid:req.query.userid}).exec()
    .then(review=> {
      res.json({review:review});
      })
    .catch(validationError(res));
};