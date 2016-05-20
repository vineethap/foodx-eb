'use strict';

import {Router} from 'express';
import * as controller from './review.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();
router.post('/', controller.create);
router.get('/',controller.singleItemReviews);
router.get('/selected',controller.reviewOfSelected)
module.exports = router;
