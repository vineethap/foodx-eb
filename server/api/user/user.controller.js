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
  console.log(req.body)
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ user:user,message:"created new user" });
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
/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
