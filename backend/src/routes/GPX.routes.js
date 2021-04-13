const express = require('express');
const router = express.Router();
const gpx = require('../controllers/GPX.controller');

router.get('/', gpx.getGPX);
router.post('/', gpx.createGPX);


module.exports = router;