
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trips',
            error: err.message
        });
    }
};

// GET one trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        }).exec();

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trip',
            error: err.message
        });
    }
};

// POST a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const existingTrip = await Trip.findOne({
            code: req.body.code
        }).exec();

        if (existingTrip) {
            return res.status(409).json({
                message: 'A trip with this code already exists'
            });
        }

        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res.status(201).json(newTrip);
    } catch (err) {
        return res.status(400).json({
            message: 'Error adding trip',
            error: err.message
        });
    }
};

// PUT update an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        return res.status(400).json({
            message: 'Error updating trip',
            error: err.message
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
