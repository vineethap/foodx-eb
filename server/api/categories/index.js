'use strict';

import {Router} from 'express';
import * as controller from './category.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.post('/', controller.create);
router.delete('/:id',controller.disable);
router.get('/',controller.findAll);
router.put('/:id',controller.updateDetails);
// router.put('/:id',controller.addNewSubCategory);
router.get('/:id',controller.getCategory)
module.exports = router;
