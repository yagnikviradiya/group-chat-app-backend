const mongoose = require('mongoose');
const { mongodbUrl } = require('./config');

// DB connection
const mongodbConnection = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        console.log('Database connected...');
    } catch (err) {
        console.log('Connection error ->', err.message);
    }
};
module.exports = mongodbConnection;