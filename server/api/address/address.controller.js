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

export function getAddress(req, res) {
  return Address.find({userid:req.params.id}).exec()
    .then(Address=> {
      res.json(Address);
      })
    .catch(validationError(res));
};

export function updateDetails(req, res, next) {
  var id = req.params.id;
  req.checkBody('fullname', 'enter fullname').notEmpty();
  req.checkBody('mob_no', 'Invalid mob_no').notEmpty().isInt();
  req.checkBody('address_line1', 'empty address_line1').notEmpty();
  req.checkBody('address_line2', 'empty address_line2').notEmpty();
  req.checkBody('address_line2', 'empty address_line2').notEmpty();
  req.checkBody('landmark', 'empty landmark').notEmpty();
  req.checkBody('address_type', 'empty address_type').notEmpty();
  req.checkBody('pin', 'empty pin').notEmpty().isInt();
    var errors = req.validationErrors();
      if (errors) {
        res.json(400,{"error":errors});
        return;
    }
   return Address.findById(id).exec()
    .then(address => {// don't ever give out the password or salt
      if (!address) {
        return res.status(401).end();
      }else{
        for (let val in req.body) {
          address[val] = req.body[val]
        }
        return address.save()
          .then((result) => {
            res.json(result);
          })
          .catch(validationError(res));
      }
    })
    .catch(err => next(err));
}
/**
 * Deletes an address
 * restriction: 'customer'
 */
export function removeAddress(req, res) {
  return Address.findByIdAndRemove(req.params.id).exec()
    .then(() =>{
      res.json({status:200}).end();
    })
    .catch(handleError(res));
}