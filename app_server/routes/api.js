const express = require('express');
const router = express.Router();

const tripsController = require('../app_server/controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList);

module.exports = router;