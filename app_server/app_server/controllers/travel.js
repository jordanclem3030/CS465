
/* GET travel view using the REST API */

const http = require('http');

const travel = (req, res) => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/trips',
        method: 'GET'
    };

    http.get(options, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            try {
                if (apiRes.statusCode !== 200) {
                    return res.status(502).send('Unable to retrieve trips');
                }

                const trips = JSON.parse(data);

                res.render('travel', {
                    title: 'Travlr Getaways',
                    trips: trips
                });
            } catch (err) {
                res.status(500).send('Error processing trip data');
            }
        });
    }).on('error', (err) => {
        console.error(err);
        res.status(500).send('Error connecting to the API');
    });
};

module.exports = {
    travel
};
