const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips) {
            return res.status(404).json({
                message: 'Trips not found'
            });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trips',
            error: err.message
        });
    }
};

module.exports = {
    tripsList
};