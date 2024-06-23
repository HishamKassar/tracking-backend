const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const vehicleLocationRoutes = require('./routes/vehicleLocationRoutes');
const tripRoutes = require('./routes/tripRoutes');
const logger = require('./utils/logger');
const setupSocket = require('./socket');

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(express.json());

// Connect to the database
connectDB();

// Define routes
app.use('/api/v1/vehicleLocations', vehicleLocationRoutes);
app.use('/api/v1/trips', tripRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 6002;
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
