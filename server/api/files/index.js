'use strict';

var express = require('express');
var controller = require('./files.controller');

var router = express.Router();
router.post('/', controller.fileupload);
module.exports = router;
