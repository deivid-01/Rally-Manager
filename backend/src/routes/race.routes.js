const express = require('express');
const router = express.Router();
const raceCtrl = require('../controllers/race.controller');
const race = require('../models/race');

router.get('/:id', raceCtrl.getOne);
router.get('/', raceCtrl.getAll);

router.post('/', raceCtrl.createOne);

router.delete('/:id',raceCtrl.deleteOne);
router.delete('/',raceCtrl.deleteAll);
//router.post('/file', trackpointCtrl.createAll);

module.exports = router;