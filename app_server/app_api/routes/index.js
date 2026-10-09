
const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// Get all trips
router.get('/trips', tripsController.tripsList);

// Get one trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;
