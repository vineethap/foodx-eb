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
  req.checkBody('fullname', 'enter fullname').notEmpty();
  req.checkBody('mob_no', 'Invalid mob_no').notEmpty().isInt();
  req.checkBody('address_line1', 'empty address_line1').notEmpty();
  req.checkBody('address_line2', 'empty address_line2').notEmpty();
  req.checkBody('address_line2', 'empty address_line2').notEmpty();
  req.checkBody('landmark', 'empty landmark').notEmpty();
   req.checkBody('address_type', 'empty address_type').notEmpty();
   req.checkBody('pin', 'empty pin').notEmpty().isInt();
  newAddress.active=true;
  newAddress.save()
    .then(function(address) {
    	res.json({ address:address,message:"created new address" });
      })
    .catch(validationError(res));
};