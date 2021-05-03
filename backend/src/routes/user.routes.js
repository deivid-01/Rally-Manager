const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.get('/', userCtrl.getAll);
router.post('/', userCtrl.createOne);
//router.post('/file', trackpointCtrl.createAll);

module.exports = router;