const express = require('express');
const connectDB = require('./config/db');
const vehicleRoutes = require('./routes/vehicleRoutes');
const logger = require('./utils/logger');
const vehicleService = require('./services/vehicleService');

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

vehicleService.getAllVehicles()
.then((vehicles) => {
    if (vehicles.length == 0) {
        vehicleService.createVehicle('car1', '123')
        .then(() => {
        })
        .catch((e) => {
            logger.error('Seed vehicle failed:', e.message);
        });

        vehicleService.createVehicle('car2', '456')
        .then(() => {
        })
        .catch((e) => {
            logger.error('Seed vehicle failed:', e.message);
        });
    }
})
.catch((error) => {
    logger.error('Seed vehicles failed:', error.message);
});

// Define routes
app.use('/api/v1/vehicles', vehicleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 6003;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
