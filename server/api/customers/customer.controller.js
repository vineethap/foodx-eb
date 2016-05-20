'use strict';
import Customer from './customer.model';
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

/*creates new customer */
export function generateOtp(req, res, next) {
	return Customer.findOne({phone:req.body.phone}).exec()
    .then(customer=> {
    	if (!customer) {
    		var newcustomer = new Customer(req.body);
        req.checkBody({'phone': { // 
          notEmpty: true,
          isInt:true,
          isLength: {
            options: [{ min: 10, max: 10 }],
            errorMessage: 'Must be  10 chars long' // Error message for the validator, takes precedent over parameter message 
          },
          errorMessage: 'Invalid phone'
          }
        })
         var errors = req.validationErrors();
          if (errors) {
            res.json(400,{"error":errors});
            return;
          }
 				newcustomer.otp=Math.floor(100000 + Math.random() * 900000);
 				newcustomer.timestamp=Date.now();
    		newcustomer.save()
	    	.then(function(customer) {
	    		res.json({ customer:customer});
	      })
	    	.catch(validationError(res));
    		
      }else{
        customer.otp=Math.floor(100000 + Math.random() * 900000);
    	  customer.save()
    	  .then(function(customer) {
	    		res.json(customer);
	      })
	  	}
    })
    .catch(validationError(res));
};
export function verifyOtp(req,res,next) {
	return Customer.findOne({phone:req.body.phone}).exec()
    .then(customer=> {
    	let d=customer.timestamp;
    	let time=d.getTime();
    	 time += 2 * 60* 1000;
    	let current_time=Date.now();
    	if(current_time <= time && customer.otp==req.body.otp){
    		console.log("done")
        res.json({message:"valid otp."})
    	}else{
        res.json({message:"invalid otp."})
      }
    })
    .catch(validationError(res));
	}