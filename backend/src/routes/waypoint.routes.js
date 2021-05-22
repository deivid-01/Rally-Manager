const express = require('express');
const router = express.Router();
const waypointCtrl = require('../controllers/waypoint.controller');

router.get('/', waypointCtrl.getAll);
//router.post('/', waypointCtrl.createOne);
router.post('/file', waypointCtrl.createAll);
router.delete('/', waypointCtrl.deleteAll);


module.exports = router;