var express = require('express');
var authenticateController = require('../controllers/authenticateController');

const router = express.Router();

router.route('/:email')
    .get(authenticateController.get);

module.exports = router;
