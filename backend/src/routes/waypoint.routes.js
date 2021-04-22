const express = require('express');
const router = express.Router();
const waypoint = require('../controllers/waypoint.controller');

router.get('/', waypoint.getWaypoints);
router.post('/', waypoint.createWaypoint);
router.post('/file', waypoint.createWaypoints);
router.delete('/', waypoint.deleteAll);


module.exports = router;