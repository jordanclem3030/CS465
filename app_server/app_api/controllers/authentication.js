
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// Authenticate an existing administrator
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'All fields are required.'
        });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                message: 'Authentication error.'
            });
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || 'Invalid credentials.'
            });
        }

        try {
            const token = user.generateJwt();

            return res.status(200).json({
                token: token
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Unable to generate authentication token.'
            });
        }
    })(req, res);
};

module.exports = {
    login
};
