const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category.controller');

router.get('/', categoryCtrl.getAll);
router.post('/', categoryCtrl.createOne);
router.delete('/:id',categoryCtrl.deleteOne);
router.delete('/',categoryCtrl.deleteAll);
//router.post('/file', trackpointCtrl.createAll);

module.exports = router;