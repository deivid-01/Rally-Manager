const express = require('express');
const router = express.Router();
const gpx = require('../controllers/gpx.controller');

router.get('/', gpx.getGPX);
router.post('/', gpx.createGPX);
router.post('/file', gpx.createWaypoints);


module.exports = router;