'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.disable);
router.put('/:id', auth.isAuthenticated(),controller.updateDetails)
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/',auth.hasRole('admin'), controller.create);
router.post('/signup',controller.customerSignUp);
router.post('/login',auth.hasRole('customer'),controller.customerLogin);
router.post('/verify',auth.hasRole('customer'), controller.verifyOtp);

module.exports = router;
