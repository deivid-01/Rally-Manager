const express = require('express');
const router = express.Router();
const stageCtrl = require('../controllers/stage.controller');

router.get('/', stageCtrl.getAll);
router.post('/', stageCtrl.createOne);
router.delete('/:id',stageCtrl.deleteOne);
router.delete('/',stageCtrl.deleteAll);
//router.post('/file', trackpointCtrl.createAll);

module.exports = router;