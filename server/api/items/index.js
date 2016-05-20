'use strict';

import {Router} from 'express';
import * as controller from './items.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.post('/', controller.create);
router.delete('/:id',controller.disable);
router.get('/',controller.find);
router.get('/getFeatured',controller.getFeatured);
router.put('/:id',controller.updateDetails);
router.post('/featured', controller.featured);
router.get('/:id', controller.getOne);
router.put('/updateFeatured/:id',controller.updateFeatured);
module.exports = router;