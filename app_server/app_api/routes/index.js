
const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Verify administrator authentication token
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

// Administrator login
router.post('/login', authController.login);

// Public routes
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// Protected administrator routes
router.post('/trips', auth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', auth, tripsController.tripsUpdateTrip);

module.exports = router;
