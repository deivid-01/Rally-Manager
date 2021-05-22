const express = require('express');
const router = express.Router();
const partialResultCtrl = require('../controllers/partialresult.controller');
const race = require('../models/race');

//router.get('/:id', partialResultCtrl.getOne);
router.get('/', partialResultCtrl.getAll);

router.post('/file', partialResultCtrl.createMany);
router.post('/', partialResultCtrl.createOne);

//router.delete('/:id',partialResultCtrl.deleteOne);
router.delete('/',partialResultCtrl.deleteAll);
//router.post('/file', trackpointCtrl.createAll);

module.exports = router;