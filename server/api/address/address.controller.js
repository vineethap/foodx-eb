'use strict';
import Address from './address.model';
import  shortid from 'shortid';

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
/*creates new category */
export function create(req, res, next) {
  var newAddress = new Address(req.body);
  newAddress.active=true;
  newAddress.save()
    .then(function(address) {
    	res.json({ address:address,message:"created new address" });
      })
    .catch(validationError(res));
};