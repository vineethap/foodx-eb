'use strict';

import {Router} from 'express';
import * as controller from './orders.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.post('/',auth.hasRole('customer'), controller.create);
router.get('/',controller.findAll);
router.get('/:id',controller.findOrder);
router.get('/customer/:id',controller.findUserOrders)
module.exports = router;
