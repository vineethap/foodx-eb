'use strict';

import {Router} from 'express';
import * as controller from './customer.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.post('/', controller.generateOtp);
router.post('/verify',controller.verifyOtp);
module.exports = router;
