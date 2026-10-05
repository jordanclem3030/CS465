const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

var seedData = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(seedData);
};

seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
});