'use strict';

import {Router} from 'express';
import * as controller from './address.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.post('/',auth.hasRole('customer'), controller.create);
router.get('/:id',auth.hasRole('customer'),controller.getAddress);
router.put('/:id',auth.hasRole('customer'),controller.updateDetails);
router.delete('/:id', auth.hasRole('customer'), controller.removeAddress);
module.exports = router;

