const express = require('express');
const router = express.Router();
const resultCtrl = require('../controllers/results.controller');


router.get('/stages/:id', resultCtrl.getStageResult);
router.get('/races/:id', resultCtrl.getRaceResult);



module.exports = router;