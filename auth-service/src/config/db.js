const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
module.exports.mongoose = mongoose;