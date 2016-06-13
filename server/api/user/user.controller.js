'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

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

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({role:req.query.role}, '-salt -password').exec()
    .then(users => {
      
      res.status(200).json(users);
    })
    .catch(handleError(res));
}
export function fileupload(req, res) {
   return User.findById(req.params.id).exec()
    .then(user => {
  
      res.status(200).json(user);
    })
    .catch(handleError(res));
}
/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      console.log(token)
      res.json({ user:user,message:"created new user" });
    })
    .catch(validationError(res));
}

/*creates a new customer*/
export function customerSignUp(req, res, next) {
  var newuser = new User(req.body);
  newuser.role = 'customer';
  newuser.provider = 'local';
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
  newuser.otp=Math.floor(100000 + Math.random() * 900000);
  newuser.timestamp=Date.now();
  newuser.save()
  .then(function(customer) {
    var token = jwt.sign({ _id: customer._id }, config.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
    console.log(token)
    res.json({ customer:customer});
  })
  .catch(validationError(res));
    
};

/*customer login*/
export function customerLogin(req, res, next) {
return User.findOne({phone:req.body.phone}).exec()
    .then(customer=> {
      if(customer){
         customer.otp=Math.floor(100000 + Math.random() * 900000);
         customer.timestamp=Date.now();
         customer.save()
        .then(function(customer) {
            var token = jwt.sign({ _id: customer._id }, config.secrets.session, {
              expiresIn: 60 * 60 * 5
            });
          res.json({message:"login successfull",customer:customer});
        })
      }else{
        res.json({message:"no such user"})
      }
    })
    .catch(validationError(res));
  }

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;
  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Disable and enable a user
 * restriction: 'admin'
 */
export function disable(req, res) {
  return User.findById(req.params.id).exec()
    .then(user => {
      user.active = !user.active;
      return user.save()
      .then(() => {
        res.status(201).end();
      })
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}
export function updateDetails(req, res, next) {
  var userId = req.body._id;
  return User.findById(userId).exec()
    .then(user => {// don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }else{
        user.name=req.body.name;
        user.lastname=req.body.lastname;
        user.email=req.body.email;
        user.address=req.body.address;
        user.gender=req.body.gender;
        
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      }
    })
    .catch(err => next(err));
}

/*verify otp*/
export function verifyOtp(req,res,next) {
  return User.findOne({phone:req.body.phone}).exec()
    .then(customer=> {
      if(customer){
        let d=customer.timestamp;
        let time=d.getTime();
         time += 2 * 60* 1000;
        let current_time=Date.now();
        if(current_time <= time && customer.otp==req.body.otp){
          res.json({message:"valid otp."})
        }else{
          res.json({message:"invalid otp."})
        }
      }else{
       res.json({message:"not a registered user"}) 
      }
      
    })
    .catch(validationError(res));
  }
/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
